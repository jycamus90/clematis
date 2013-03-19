package com.metis.core.trace;

import com.metis.core.episode.EpisodeSource;

public class DOMMutationTrace extends TraceObject/* implements EpisodeSource */{
	private String mutationType;
	private String data;
	private String nodeName;
	private String nodeValue;
	private String nodeType;
	private String parentNodeValue;

	public DOMMutationTrace() {
		super();
		setEpisodeSource(false);
	}

	public String getMutationType() {
		return mutationType;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public void setMutationType(String mutationType) {
		this.mutationType = mutationType;
	}

	public String getNodeName() {
		return nodeName;
	}

	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}

	public String getNodeValue() {
		return nodeValue;
	}

	public void setNodeValue(String nodeValue) {
		this.nodeValue = nodeValue;
	}
  
	public String getNodeType() {
		return nodeType;
	}

	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}

	public String getParentNodeValue() {
		return parentNodeValue;
	}

	public void setParentNodeValue(String parentNodeValue) {
		this.parentNodeValue = parentNodeValue;
	}
	

}
