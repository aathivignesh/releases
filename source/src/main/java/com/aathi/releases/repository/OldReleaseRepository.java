package com.aathi.releases.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aathi.releases.model.OldRelease;


@Repository
public interface OldReleaseRepository extends JpaRepository<OldRelease, Long> {

}
