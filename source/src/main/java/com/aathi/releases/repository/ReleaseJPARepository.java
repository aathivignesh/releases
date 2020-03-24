package com.aathi.releases.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aathi.releases.model.Note;

@Repository
public interface ReleaseJPARepository extends JpaRepository<Note, Long> {

}
