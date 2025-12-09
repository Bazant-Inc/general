interface Agent {
    id: string; // PK, UUID
    workspace_id: string;
    auth_key: string;
    hostname: string; // from device
    name: string; // given by the user, the same as given when registering device to headscale
    is_connected: boolean;
    is_registered: boolean;
}

interface AgentMG {
    id: string;
    name: string;
    workspace_id: string;
    headscale_id: string | null;
    auth_key: string | null;
}

// DTOs
interface ReturnAgentDTO {
    id: string; // UUID
    name: string;
    hostname: string | null;
    isRegistered: boolean;
    isConnected: boolean;
    workspaceId: string; // UUID
    workspaceName: string;
    authKey: string | null;
}

interface CreateAgentDTO {
    name: string;
    workspaceId: string; // UUID
}

interface UpdateAgentDTO {
    name: string | null;
    // there are more, but realistically frontend will only update this
}
