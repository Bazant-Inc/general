interface Agent {
    id: string; // PK, UUID
    workspace_id: string;
    auth_key: string;
    hostname: string; // from device
    name: string; // given by the user, the same as given when registering device to headscale
    is_connected: boolean;
}

interface AgentMG {
    id: string;
    name: string;
    workspace_id: string;
    headscale_id: string | null;
    auth_key: string | null;
}