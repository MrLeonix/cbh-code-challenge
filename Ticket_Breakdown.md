# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### CBH-001
**Create new relationship table for cutom Agent id**

**Summary:** We need to create a new relationship table for storing a custom ID provided by the facility to be mapped to an Agent. It should have three columns: `agentId`, `facilityId` and `customAgentId`.

The `agentId` column should be typed the same as the `id` column in Agents table.

The `facilityId` column should be typed the same as the `id` column in Facilities table.

The `customAgentId` column should be typed as `VARCHAR`, as each facility may have different types of internal ids among them, so we should consider storing such values as string.

**Implementation details**
- Create new `FacilityCustomAgentIds` table.
- Add composite primary key for `agentId` and `facilityId` columns.

**Acceptance criteria**
- Have a new migration script file for creating the new table.
- Have the new table created.

**Estimation:** 1 point

### CBH-002
**Implement model for the new facility custom agent id relationship table**

**Summary**


**Implementation details**
- Create new `FacilityCustomAgentId` entity model.

**Acceptance criteria**
- Data update integration test

**Estimation:** 2 points

### CBH-003
**Expose a new endpoint for setting an `externalId` for an Agent**

**Summary**
We need to create a new endpoint that is going to update the Agent `externalId` for a facility. It should be mapped to the Agents entity path by id (`/agents/{id}/set-custom-id`) and use the user's token for authentication (`Authorization` header). The facility ID of the requesting user should be used to update the Agent data. The custom agent ID to be used as the `externalId` value should be provided as JSON via request body as `{ "customId": "<id>" }`.

**Implementation details**
- Add new `PATCH` endpoint, mapped to `/agents/{id}/set-custom-id` path.
- Validate received token.
    - If token is invalid, return 401 status
- Check if Agent with provided ID exists.
    - If Agent does not exist, return 400 status with failed reason (`No Agent found with requested id`)
- Consume request body to extract the `customId` property.
- Update the `FacilityCustomAgentIds` table with the new custom id for the agent id and facility id.

**Acceptance criteria**
- New endpoint created and exposed.
- API endpoint test (make sure endpoint is reacheable)
- Authentication validation test
- Payload validation test
- Data update integration test
- Error handling test

**Estimation:** 2 points

### CBH-004
**Replace internal Agent ID in report generation with custom agent id, if applicable**

**Summary**


**Implementation details**


**Acceptance criteria**


**Estimation:** 2 points

### CBH-005
**Add internal Agent id indicator to PDF report**

**Summary**
In order to make identification easier for facilities to check which Agents are using our internal Agent ids, we should add an indicator to the PDF report. A simple red asterisk (`*`) should do it.

**Implementation details**
- Append a red asterisk to the Agent ID in the PDF report table.

**Acceptance criteria**
- Have the PDF report mark each agent with a red asterisk when it is still using an internal Agent id.
- Have PDF report example.

**Estimation:** 1 point