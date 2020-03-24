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
import com.aathi.releases.model.BugfixIssue;
import com.aathi.releases.model.Release;
import com.aathi.releases.repository.*;

@RestController
public class BugfixIssueController {
	
	@Autowired
	BugfixIssueRepository BugfixIssueRepository;

	
	  @GetMapping("/getbugfixissue")
	    public List<BugfixIssue> getAllIssue() {
	        return BugfixIssueRepository.findAll();
	  }	    
	  
	   // dsdsCreate a new Release
	    @RequestMapping("/issuesubmit")
	    public BugfixIssue createIssue(@Valid @RequestBody BugfixIssue BugfixIssue) {
	    	System.out.println("Inside createRelease method  data:" + BugfixIssue.toString());    	
	        return BugfixIssueRepository.save(BugfixIssue);
	    }
	    
	    @PutMapping("/UpdateBugfixIssue/{id}")
	    public BugfixIssue updateIssue(@PathVariable(value = "id") Long Issueid,
	                                            @Valid @RequestBody BugfixIssue BugfixIssueDetails) {
	    	
	    	System.out.println("Inside updateIssue method data:#####################"+ BugfixIssueDetails.getIsNo() + Issueid); 

	    	BugfixIssue BugfixIssue = BugfixIssueRepository.findById(Issueid)
	                .orElseThrow(() -> new ResourceNotFoundException("BugfixIssue", "id", Issueid));
	    	BugfixIssue.setIsNo(BugfixIssueDetails.getIsNo());
	    	BugfixIssue.setIsDet(BugfixIssueDetails.getIsDet());
	    	BugfixIssue.setStatus(BugfixIssueDetails.getStatus());
	    	BugfixIssue.setCreatedbyuser(BugfixIssueDetails.getCreatedbyuser());
	    	
	    	System.out.println("Inside updateIssue method data:#####################"+ BugfixIssue); 
	    	
	    	
	    	BugfixIssue updatedissue = BugfixIssueRepository.save(BugfixIssue);
	        return updatedissue;
	    }
	    
	    
	
	    
	    
	   
	    
}
