// {
//     “action_name”: ...
//     “transaction_id”: ...
//     “progress”: {
//          “m1”: status,
//          “m2”: status,
//           ....
//       }
// }

// {
//     “action_name”: ...
//     “object_kind”: ...,
//     “object_id”: ....,in progress iconin progress icon
//     “progress”: [
//       { “milestoneName”: “cel 1”, “status”:status }
//       { “milestoneName”: “cel 2”, “status”:status }
//     ]
// }
import { ActionStatus, ActionType } from './queues/kafka.dto';

type ObjectKind = 'Workspace' | 'Agent'

// get from rest for given workspace via pg_id
interface ActionStatus {
    workspace_id: string;
    action_name: ActionType;
    object_kind: ObjectKind;
    object_id: string;
    progress: Array<{
        milestoneName: string;
        status: ActionStatus;
    }>;
}

interface ActionLog {
    workspace_id: string;
    action_name: ActionType;
    object_kind: ObjectKind;
    object_id: string;
    progress: Array<string>;
}

interface ActionStatusHistory {
    workspace_id: string;
    actions: Array<ActionStatus>;
    logs: Array<ActionLog>;
    last_id: number; // pre-computed by backend or do in frontend
}