type ObjectKind = 'WORKSPACE' | 'AGENT';

export interface SSEBaseMessage {
  transactionId: string;
  timestamp: string;
  objectKind: ObjectKind;
  objectId: string | null;
}

export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE';

type ActionType = 'CREATE_WORKSPACE' | 'DELETE_WORKSPACE' | 'ADD_AGENT';

export type ActionDefinitionPayload = Record<ActionType, string[]>;

// ActionHistory REST Endpoint
export type ActionHistoryPayload = Array<{
  transactionId: string;
  type: ActionType;
  timestamp: string;
  milestones: Array<{
    milestoneLabel: string;
    status: MilestoneStatus;
    timestamp: string;
  }>;
}>;


// ActionMessage parsed from SSE data
export type ActionMessage = SSEBaseMessage & {
  type: ActionType;
  message: string;
  status: MilestoneStatus;
};

// LogMessage parsed from SSE data
export type LogMessage = SSEBaseMessage & {
  message: string;
};
