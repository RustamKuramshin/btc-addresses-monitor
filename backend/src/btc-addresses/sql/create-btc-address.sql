INSERT INTO btc_addresses (address)
VALUES ($1)
ON CONFLICT ON CONSTRAINT btc_addresses_pk
DO NOTHING;