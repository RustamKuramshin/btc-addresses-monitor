SELECT ba.address, ba.balance, ba.datetime_last_check, ba.relative_time
FROM btc_addresses ba
WHERE ba.address = $1;