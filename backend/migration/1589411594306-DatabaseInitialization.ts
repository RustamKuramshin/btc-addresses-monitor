import {MigrationInterface, QueryRunner} from "typeorm";

export class DatabaseInitialization1589411594306 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        -- Create database for BTC Address Monitor
        
        CREATE EXTENSION IF NOT EXISTS pgcrypto;

        CREATE TABLE btc_addresses
        (
            address varchar(35) NOT NULL
                CONSTRAINT btc_addresses_pk 
                    PRIMARY KEY,
            balance numeric(16,8),
            datetime_last_check timestamp DEFAULT now(),
            relative_time interval
        );

        COMMENT ON TABLE btc_addresses IS 'BTC addresses';

        CREATE TABLE settings
        (
            property varchar(256)
                CONSTRAINT settings_pk
                    PRIMARY KEY,
            value    varchar(256)
        );

        COMMENT ON TABLE settings IS 'System settings';
        
        -- Default system settings
        INSERT INTO settings (property, value) VALUES ('blockchain_api_request_limit_per_minute', '10'),
                                                      ('heartbeat_rate_every_seconds', '5'),
                                                      ('blockchain_api_request_frequency_every_seconds', '2');
        
        CREATE TABLE service_registry
        (
            id uuid DEFAULT gen_random_uuid()
                CONSTRAINT service_registry_pk
                    PRIMARY KEY,
            datetime_last_pulse timestamp DEFAULT now() NOT NULL
        );

        COMMENT ON TABLE service_registry IS 'Service registry';

        CREATE OR REPLACE FUNCTION remove_expired_heartbeats() RETURNS trigger AS
        $$
        DECLARE
            heartbeat_rate_every_seconds INTEGER := 0;
        BEGIN
            SELECT s.value::INTEGER INTO heartbeat_rate_every_seconds FROM settings s WHERE s.property = 'heartbeat_rate_every_seconds';
            DELETE FROM service_registry WHERE now() - datetime_last_pulse > (INTERVAL '1 seconds' * heartbeat_rate_every_seconds);
            RETURN NEW;
        END;
        $$
            LANGUAGE PLPGSQL;

        CREATE TRIGGER remove_expired_heartbeats_trigger AFTER INSERT OR UPDATE ON service_registry
            FOR STATEMENT EXECUTE PROCEDURE remove_expired_heartbeats();

        CREATE TABLE token_bucket
        (
            id uuid NOT NULL
                CONSTRAINT token_bucket_pk
                    PRIMARY KEY,
            datetime_last_refill timestamp NOT NULL,
            current_number       int DEFAULT 0 NOT NULL,
            max_number           int DEFAULT 0 NOT NULL
        );

        COMMENT ON TABLE token_bucket IS 'Token bucket';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE IF EXISTS btc_addresses;
                                       DROP TABLE IF EXISTS settings;
                                       DROP TRIGGER remove_expired_heartbeats_trigger ON service_registry;
                                       DROP FUNCTION remove_expired_heartbeats();
                                       DROP TABLE IF EXISTS service_registry;`);
    }

}
