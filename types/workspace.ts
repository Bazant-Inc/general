interface WorkspacePG {
	id: string; // PK, UUID
	name: string;

	user_id: string; // FK
}

interface WorkspaceMG {
	name: string;
	conf_id: string;
	pg_id: string; // "FK" from PG
	vm_ip_priv_addr: string;
	vm_azure_domain: string;
	vm_ssh_key: string;
}

// DTOs
interface CreateWorkspaceDto {
	user_id: string;
	workspace_id: string;
	workspace_name: string;
}

interface CreateAgentDto {
	workspace_id: string;
	name: string;
}
