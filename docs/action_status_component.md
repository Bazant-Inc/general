# Action status visualization

## Data source
* Action history -> REST API
  * Gets all completed past actions (ActionStatus)
  * Gets 
* Pending actions -> SSE
  * Calls SSE entrypoint 

# Communication description

## DB tables

**workspace**
```sql
CREATE TABLE workspace (
    id {workspaceId}
    name varchar
    user_id uuid
)
```

**agent**
```sql
CREATE TABLE agent (
    id {agentId}
    name varchar
    hostname varchar
    is_connected boolean
    is_registered boolean
    workspace_id {workspaceId} 
)
```

**transactions**
```sql
    id uuid
    type enum(ActionType)
    related_id {workspaceId} / {agentId}
    status  enum(ActionStatus)
    created_at timestamp
```

Notice that transactions of an agent being added to a workspace can be queried by workspaceId

## Workspace creation

**endpoint**: `POST` /api/workspaces

*Params*
```json
{
    "name": "{workspaceName}"
}
```

*Return*
```json
{
  "id": "{workspaceId}",
  "name": "{workspaceName}",
  "userId": "{userId}",
  "agentCount": 0,
  "azureDomain": null,
  "publicIP": null
}
```

## Agent creation

**endpoint** `POST` /api/agents

*Returns*
```json
{
  "id": "f1f6076b-e6a4-4d51-b706-63b2f9845cc2",
  "name": "{agentName}",
  "hostname": null,
  "isRegistered": false,
  "isConnected": false,
  "workspaceId": "{workspaceId}",
  "workspaceName": "{workspaceName}",
  "authKey": null
}
```

### SSE stream reference

Save references of:
* `workspaceName`:`workspaceId`
* `agentName`:`workspaceId`

call SSE endpoint using the `workspaceId` of displayed agent or workspace
Distinguish

## ActionStatuses

Progression of ActionStatuses is implemented using the count of previous status updates.
This is done, because frontend needs to display all of the milestones. They shouldn't be dynamically set.

### Enum

Number of milestones is based on the amount of `IN_PROGRESS` messages from automation-service

```java
val milestoneMap = mapOf(
    ActionType.CREATE_WORKSPACE to
        listOf(
            "Submitting action",
            "Creating infrastructure",
            "Configuring spoke orchestration"
        ),
    ActionType.DELETE_WORKSPACE to
        listOf(
            "Submitting action",
            "Retrieving workspace configuration",
            "Destroying workspace infrastructure",
            "Deleting workspace configuration"
    ),
    ActionType.ADD_AGENT to
        listOf(
            "Submitting action",
            "Creating new agent user",
            "Fetching agent id",
            "Creating auth key",
            "Saving agent configuration"
    )
)
```

ActionType: CREATE_WORKSPACE | DELETE_WORKSPACE | ADD_AGENT
ActionStatus: IN_PROGRESS | SUCCESS | FAILURE | PENDING
ObjectKind: WORKSPACE | AGENT

## SSE

**endpoint**: `GET` /api/stream/{workspaceId}
> identified by workspaceId, because transactionId is never sent to the frontend

finds transactionId based on workspaceId

*Returns*

for `milestoneEvent`
```json
{
    "transactionId": {transactionId},
    "timestamp": Timestamp,
    "type": enum(ActionType),
    "objectKind": enum(ObjectKind),
    "status": enum(ActionStatus),
    "message": {message from automation service}, # can be different from milestoneLabel (maybe display it in small light grey font under the Milestone label? )
    "milestoneLabel": enum(milestoneMap[type])
}
```

for `logEvent`
```json
    transactionId: {transactionId},
    objectKind: enum(ObjectKind)
    timestamp: Timestamp,
    message: String,
```

In theory ObjectKind can be derived from milestoneLabel as the frontend will need to hardcode the same `milestoneMap`




