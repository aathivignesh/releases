package com.aathi.releases.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aathi.releases.model.BugfixIssue;
import com.aathi.releases.model.BugfixRelease;


@Repository

public interface BugfixRepository extends JpaRepository<BugfixRelease, Long>{

}
