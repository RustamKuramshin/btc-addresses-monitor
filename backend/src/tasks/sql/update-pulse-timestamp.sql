UPDATE service_registry SET datetime_last_pulse = now() WHERE id = $1;