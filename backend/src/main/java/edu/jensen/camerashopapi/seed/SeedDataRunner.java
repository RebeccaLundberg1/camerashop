package edu.jensen.camerashopapi.seed;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
@ConditionalOnProperty(name = "USE_SEEDING", havingValue = "true")
public class SeedDataRunner implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(SeedDataRunner.class);

    private final JdbcTemplate jdbcTemplate;
    private final DataSource dataSource;
    private final ResourceLoader resourceLoader;

    public SeedDataRunner(JdbcTemplate jdbcTemplate, DataSource dataSource, ResourceLoader resourceLoader) {
        this.jdbcTemplate = jdbcTemplate;
        this.dataSource = dataSource;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!isProductsTableEmpty()) {
            logger.info("Seeding skipped: products table already has data.");
            return;
        }

        Resource seedScript = resourceLoader.getResource("classpath:seed.sql");
        if (!seedScript.exists()) {
            logger.warn("Seeding skipped: seed.sql not found on classpath.");
            return;
        }

        logger.info("Seeding database using seed.sql");
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator(seedScript);
        populator.setContinueOnError(false);
        DatabasePopulatorUtils.execute(populator, dataSource);
    }

    private boolean isProductsTableEmpty() {
        try {
            Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM products", Long.class);
            return count == null || count == 0;
        } catch (DataAccessException ex) {
            logger.warn("Seeding skipped: unable to query products table ({}).", ex.getMessage());
            return false;
        }
    }
}
