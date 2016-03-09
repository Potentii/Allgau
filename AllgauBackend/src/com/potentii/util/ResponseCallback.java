package com.potentii.util;

public interface ResponseCallback<T> {
	void onSuccess(T response);
	void onFailure(Exception e);
}
