package com.aathi.releases;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ReleasesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReleasesApplication.class, args);
	}
}
