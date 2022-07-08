
DELIMITER |
CREATE EVENT prune_reserves
    ON SCHEDULE EVERY 1 MINUTE STARTS (NOW())
    DO
        BEGIN
            DELETE FROM bodega_cc.reserve WHERE TIMESTAMPDIFF(HOUR,createdAt, now()) >= 2 AND status = 1;
        END |
DELIMITER ;