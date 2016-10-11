/**
 * 
 */
package com.pwcsdc.newoa.model;

/**
 * @author Francis Yang
 *
 *auditProcess:
{
    "step" : 0,
    "processor" : "OM"
}
 */

public class AuditProcess {
	
	private int step;
	
	private String processor;

	public int getStep() {
		return step;
	}

	public void setStep(int step) {
		this.step = step;
	}

	public String getProcessor() {
		return processor;
	}

	public void setProcessor(String processor) {
		this.processor = processor;
	}

}
