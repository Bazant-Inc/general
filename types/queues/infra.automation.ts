interface AutomationCreateWorkspaceDto {
	userId: string;
	workspaceId: string;
	workspaceName: string;
}

interface AutomationDeleteWorkspaceDto {
	workspaceId: string;
}

interface AutomationAddAgentDto {
	workspaceId: string;
	agentId?: string;
	agentName: string;
}

interface AutomationResponseDto {
	status: ActionStatus;
	message: string;
}

//--------
// example
const x: KafkaDto<AutomationCreateWorkspaceDto> = {
	transactionId: '',
	type: 'CREATE_WORKSPACE',
	payload: { userId: '', workspaceId: '', workspaceName: '' },
};
//--------
