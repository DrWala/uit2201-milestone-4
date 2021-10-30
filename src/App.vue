<template>
    <div id="app">
        <div class="container">
            <div class="notification is-primary">
                This is a demo for the citizen issue tracker app. To keep things
                simple, file upload does not work here.
            </div>
            <h1 class="title">Report an issue here</h1>
            <b-field label="Issue Title">
                <b-input v-model="issueTitle"></b-input>
            </b-field>
            <b-field label="Description">
                <b-input v-model="issueDescription"></b-input>
            </b-field>
            <b-field label="Location">
                <b-input v-model="issueLocation"></b-input>
            </b-field>
            <b-field label="Upload relevant photos">
                <b-upload multiple drag-drop>
                    <section class="section">
                        <div class="content has-text-centered">
                            <p>
                                <b-icon icon="upload" size="is-large"> </b-icon>
                            </p>
                            <p>Drop your files here or click to upload</p>
                        </div>
                    </section>
                </b-upload>
            </b-field>
            <b-field label="Category">
                <b-autocomplete
                    v-model="issueCategory"
                    placeholder="e.g. Water, electricity"
                    :data="issueCategories"
                    field="user.first_name"
                    @select="(option) => (selected = option)"
                >
                </b-autocomplete>
            </b-field>
            <b-field label="Election promises this issue relates to"> </b-field>
            <div v-for="promise in electionPromises" :key="promise">
                <b-field>
                    <b-checkbox v-model="issuePromises" :native-value="promise">
                        {{ promise }}
                    </b-checkbox>
                </b-field>
            </div>
            <b-button type="is-success" @click="addIssue">Add issue</b-button>
        </div>
        <br />
        <div class="container">
            <h1 class="title">Your issues</h1>
            <div class="card" v-for="(issue, idx) in issues" :key="issue.id">
                <header class="card-header">
                    <p class="card-header-title">
                        Title: {{ issue.issueTitle }}
                    </p>
                    <p class="card-header-title">
                        Location: {{ issue.issueLocation }}
                    </p>
                    <p class="card-header-title">
                        Category: {{ issue.issueCategory }}
                    </p>
                </header>
                <div class="card-content">
                    <h6 class="title is-6">Description</h6>
                    <div class="content">{{ issue.issueDescription }}</div>

                    <h6 class="title is-6">Related promises</h6>
                    <div
                        class="content"
                        v-for="promise in issue.issuePromises"
                        :key="promise"
                    >
                        <b-checkbox disabled>
                            {{ promise }}
                        </b-checkbox>
                    </div>
                    <div class="columns is-vcentered" v-if="issue.isResolved">
                        <div class="column is-2">
                            <b-button
                                type="is-success card-footer-item"
                                @click="issueResolved(idx)"
                                >Issue Resolved</b-button
                            >
                        </div>
                        <div class="column is-2">
                            <b-button
                                type="is-danger card-footer-item"
                                @click="issueUnresolved(idx)"
                                >Issue Not Resolved</b-button
                            >
                        </div>
                    </div>
                    <b-notification type="is-info is-light" v-if="issue.note">
                        <h6 class="title is-6">Development Note</h6>
                        <div class="content">{{ issue.note }}</div>
                    </b-notification>
                </div>
            </div>
        </div>
        <b-loading v-model="isLoading"></b-loading>
        <b-modal v-model="isResolvedModalActive" :width="640">
            <div class="card">
                <div class="card-content">
                    <div class="content">Yay! The issue has been resolved</div>
                </div>
            </div>
        </b-modal>
        <b-modal v-model="isUnresolvedModalActive" :width="640">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        We're sorry to hear that and will send the issue back to
                        the staff
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
export default {
    async mounted() {
        // this.isLoading = true;
        // this.users = (await this.$axios.get("users")).data;
        // this.isLoading = false;
    },
    data() {
        return {
            issueTitle: null,
            issueDescription: null,
            issueCategory: null,
            issuePromises: [],
            issueLocation: null,
            isLoading: false,

            issueCategories: [
                "Water",
                "Sanitation",
                "Electricty",
                "Cleanliness",
            ],
            electionPromises: [
                "Electricity disruption no more than once a month",
                "Daily garbage collection",
                "Water supply will run for at least 12 hours a day",
            ],
            issues: [
                {
                    issueTitle: "No water for past 3 days",
                    issueDescription:
                        "There has been no water for the past 3 days at my house. We have to use the well outside despite water supply being promised for 12 hours a day",
                    issueLocation: "123 Ave",
                    issueCategory: "Water",
                    issuePromises: [
                        "Water supply will run for at least 12 hours a day",
                    ],
                    isResolved: true,
                    note: "This is a sample resolved issue. You can now either mark it as resolved or unresolved. The former will remove it from your imemdiate queue, the latter will send it back to staff and set the state back to unresolved.",
                },
                {
                    issueTitle: "Trash not being collected",
                    issueDescription:
                        "Trash has not been collected in 2 weeks. There are flies and it smells terrible",
                    issueLocation: "123 Ave",
                    issueCategory: "Sanitation",
                    issuePromises: ["Daily garbage collection"],
                    isResolved: false,
                    note: "This is a sample unresolved issue. As you can see, you are not able to currently act on it",
                },
            ],
            isResolvedModalActive: false,
            isUnresolvedModalActive: false,
        };
    },
    methods: {
        addIssue() {
            this.isLoading = true;
            let data = {
                issueTitle: this.issueTitle,
                issueDescription: this.issueDescription,
                issueCategory: this.issueCategory,
                issueLocation: this.issueLocation,
                issuePromises: this.issuePromises,
                isResolved: true,
                isDev: false,
            };
            this.issues.push(data);
            this.issueTitle = null;
            this.issueDescription = null;
            this.issueCategory = null;
            this.issuePromises = null;
            this.isLoading = false;
        },
        issueResolved(idx) {
            this.isResolvedModalActive = true;
            this.issues.splice(idx);
        },
        issueUnresolved(idx) {
            this.isUnresolvedModalActive = true;
            this.issues[idx].isResolved = false;
        },
    },
};
</script>
