package com.aathi.releases.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aathi.releases.exception.ResourceNotFoundException;
import com.aathi.releases.model.BugfixRelease;
import com.aathi.releases.model.Release;
import com.aathi.releases.repository.BugfixRepository;

@RestController
public class BugfixReleaseController {
	@Autowired
	BugfixRepository BugfixRepository;
	
	 @GetMapping("/prodrelease")
	    public List<BugfixRelease> getAllNotes() {
	        return BugfixRepository.findAll();
	    }
	 
	  // dsdsCreate a new Release
	    @RequestMapping("/prodreleasesubmit")
	    public BugfixRelease createRelease(@Valid @RequestBody BugfixRelease BugfixRelease) {
	    	System.out.println("Inside createRelease method  data:" + BugfixRelease.toString());    	
	        return BugfixRepository.save(BugfixRelease);
	    }
	    
	    @GetMapping("/prodsinglerelease/{id}")
	    public BugfixRelease getNoteById(@PathVariable(value = "id") Long releaseid) {
	        return BugfixRepository.findById(releaseid)
	                .orElseThrow(() -> new ResourceNotFoundException("Release", "id", releaseid));
	    }

	    // Update a release

	    @PutMapping("/produpdaterelease/{id}")
	    public BugfixRelease updateNote(@PathVariable(value = "id") Long releaseid,
	                                            @Valid @RequestBody Release releasedetails) {

	    	BugfixRelease BugfixRelease = BugfixRepository.findById(releaseid)
	                .orElseThrow(() -> new ResourceNotFoundException("Release", "id", releaseid));

	    	BugfixRelease.setLastupdatedby(releasedetails.getLastupdatedby());
	    	BugfixRelease.setDefects(releasedetails.getDefects());
	    	BugfixRelease.setUserstories(releasedetails.getUserstories());
	    	BugfixRelease.setSvnversion(releasedetails.getSvnversion());

	    	BugfixRelease updatedRelease = BugfixRepository.save(BugfixRelease);
	        return updatedRelease;
	    }
}
