interface KafkaDto<T> {
	transactionId: string;
	type: ActionType;
	payload: T;
}

type ActionType = 'CREATE_WORKSPACE' | 'DELETE_WORKSPACE' | 'ADD_AGENT';
