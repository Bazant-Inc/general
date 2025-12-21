# SSE

## States
- PENDING
- IN_PROGRESS
- SUCCESS / FAILURE
- COMPLETED

States which will end flow:
- FAILURE
- COMPLETED

Milestones handles only
- IN_PROGRESS
- SUCCESS / FAILURE

Start of transaction (action) is defined automatically by backend.

Start of transaction (action) is marked by backend by receiving COMPLETED message.

## Definition
Backend and automation service keeps the same definition of milestones labels (in AS: "message")

## Services

### Frontend

#### Logs
Logs are fetching always for latest transaction which is still in progress.

Fetching by workspace receiving all logs and appending to box.

#### Actions globally
Without history.

Fetching only all actions in progress (they are not completed).

No need to fetch definition.

Milestones will only have 3 states:
- IN_PROGRESS
- SUCCESS
- FAILURE

#### Actions by workspace
With history.

1. Fetching all milestone definitions of actions.
2. Fetching by REST API all history for actions - get all completed transactions (list of saved Events).
    - Completed or Failed action needs to contain the list of all Events that have status SUCCESS or FAILURE
3. Fetching all in progress within SSE, fullfilling previously fetched milestones with new events.

### Backend
Must set action as completed when COMPLETED message is received (or FAILURE).

Datasources:
- One endpoint for all milestone definitions of actions
- One endpoint for all history for actions by workspace (completed only)
- Three SSE endpoints 
    - logs per workspace
    - actions per workspace
    - actions globally


#### Listeners
Saving messages from automation service.

Forwarding all messages from response topic to frontend (skip COMPLETED)

### Automation service
Sending only:
- IN_PROGRESS
- SUCCESS
- FAILURE
- COMPLETED

Message is equal to milestone label
