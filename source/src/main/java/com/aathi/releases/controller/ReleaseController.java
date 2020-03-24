package com.aathi.releases.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aathi.releases.exception.ResourceNotFoundException;
import com.aathi.releases.model.Release;
import com.aathi.releases.model.BugfixIssue;
import com.aathi.releases.model.OldRelease;
import com.aathi.releases.repository.ReleaseRepository;
import com.aathi.releases.repository.BugfixIssueRepository;
import com.aathi.releases.repository.OldReleaseRepository;

@RestController

public class ReleaseController {

    @Autowired
    ReleaseRepository ReleaseRepository;
    @Autowired
    OldReleaseRepository OldReleaseRepository;
    @Autowired
	BugfixIssueRepository BugfixIssueRepository;
   

    // Get All releases
    @GetMapping("/release")
    public List<Release> getAllNotes() {
        return ReleaseRepository.findAll();
    }
    
    // Get All Old releases
    @GetMapping("/oldrelease")
    public List<OldRelease> getAllOldRelease() {
        return OldReleaseRepository.findAll();
    }


    // dsdsCreate a new Release
    @RequestMapping("/releasesubmit")
    public Release createRelease(@Valid @RequestBody Release release) {
    	System.out.println("Inside createRelease method  data:" + release.toString());    	
        return ReleaseRepository.save(release);
    }
    
    
	   @RequestMapping("/addbugfixissue")
	    public BugfixIssue createBugfixIssue(@Valid @RequestBody BugfixIssue BugfixIssue) {
	    	System.out.println("Inside createRelease method  data:" + BugfixIssue.toString());    	
	        return BugfixIssueRepository.save(BugfixIssue);
	    }
    

    @GetMapping("/singlerelease/{id}")
    public Release getNoteById(@PathVariable(value = "id") Long releaseid) {
        return ReleaseRepository.findById(releaseid)
                .orElseThrow(() -> new ResourceNotFoundException("Release", "id", releaseid));
    }

    // Update a release

    @PutMapping("/updaterelease/{id}")
    public Release updateNote(@PathVariable(value = "id") Long releaseid,
                                            @Valid @RequestBody Release releasedetails) {

        Release Release = ReleaseRepository.findById(releaseid)
                .orElseThrow(() -> new ResourceNotFoundException("Release", "id", releaseid));

        Release.setLastupdatedby(releasedetails.getLastupdatedby());
        Release.setDefects(releasedetails.getDefects());
        Release.setUserstories(releasedetails.getUserstories());
        Release.setSvnversion(releasedetails.getSvnversion());

        Release updatedRelease = ReleaseRepository.save(Release);
        return updatedRelease;
    }
    
    
    
    
}
