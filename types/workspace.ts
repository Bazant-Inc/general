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
interface ReturnWorkspaceDTO {
    id: string; // UUID
    name: string;
    userId: string; // UUID
    agentCount: number;
    azureDomain: string | null;
    publicIP: string | null;
}

interface CreateWorkspaceDTO {
    name: string;
}

interface UpdateWorkspaceDTO {
    name: string | null;
}
