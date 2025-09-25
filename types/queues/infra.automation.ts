interface InfraAutomationCreateDto {
	userId: string;
	workspaceId: string;
	workspaceName: string;
}

interface InfraAutomationDeleteDto {
	workspaceId: string;
}

//--------
// example
const x: KafkaDto<InfraAutomationCreateDto> = {
	transactionId: '',
	type: 'CREATE_WORKSPACE',
	payload: { userId: '', workspaceId: '', workspaceName: '' },
};
//--------

interface InfraAutomationResponseDto {
	workspace_id: string;
}
