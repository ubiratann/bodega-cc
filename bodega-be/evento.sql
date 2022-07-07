
DELIMITER |
CREATE EVENT prune_reserves1
    ON SCHEDULE EVERY 1 MINUTE STARTS (NOW())
    DO
        BEGIN
            DELETE FROM bodega_cc.reserve WHERE TIMESTAMPDIFF(HOUR,createdAt, now()) >= 2;
        END |
DELIMITER ;