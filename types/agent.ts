interface Agent {
    id: string; // PK, UUID
    workspace_id: string;
    auth_key: string;
    hostname: string; // from device
    name: string; // given by the user, the same as given when registering device to headscale
    is_connected: boolean;
}