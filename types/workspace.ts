interface WorkspacePG {
  id: string; // PK, UUID
  name: string;

  user_id: string; // FK
}

interface WorkspaceMG {
  _id: string; // Mongo internal
  name: string; // name for infra resources, consist of name from PG & some generated postfix
  pg_id: string; // "FK" from PG
  vm_ip_addr: string;
  vm_azure_domain: string;
  vm_ssh_key: string;
}

// DTOs
