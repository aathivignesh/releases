package com.aathi.releases.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aathi.releases.model.BugfixIssue;
@Repository
public interface BugfixIssueRepository extends JpaRepository<BugfixIssue, Long> {

	public List<BugfixIssue> findAllByOrderByIdAsc();
}
