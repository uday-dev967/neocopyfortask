<template>
    <section class="referral-section-wrapper">
        <div class="referral-container">
            <h1 class="faq-header">Frequently Asked Questions</h1>
            <div class="faq-wrapper">
                <div v-for="faq in faqs" class="faq" @click="toggleFaqAnswers(faq)" :key="faq.id">
                    <div class="faq-question">
                        <div>{{ faq.question }}</div>
                        <svg v-if="faq.showAnswer" width="36" height="36" viewBox="0 0 36 36" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18 3C15.0333 3 12.1332 3.87973 9.66645 5.52796C7.19972 7.17618 5.27713 9.51886 4.14181 12.2597C3.0065 15.0006 2.70945 18.0166 3.28823 20.9264C3.86701 23.8361 5.29562 26.5088 7.39341 28.6066C9.49119 30.7044 12.1639 32.133 15.0737 32.7118C17.9834 33.2906 20.9994 32.9935 23.7403 31.8582C26.4812 30.7229 28.8238 28.8003 30.4721 26.3336C32.1203 23.8668 33 20.9667 33 18C33 16.0302 32.612 14.0796 31.8582 12.2597C31.1044 10.4399 29.9995 8.78628 28.6066 7.3934C27.2137 6.00052 25.5601 4.89563 23.7403 4.14181C21.9204 3.38799 19.9698 3 18 3ZM18 30C15.6266 30 13.3066 29.2962 11.3332 27.9776C9.35977 26.6591 7.8217 24.7849 6.91345 22.5922C6.0052 20.3995 5.76756 17.9867 6.23058 15.6589C6.69361 13.3311 7.8365 11.1929 9.51473 9.51472C11.193 7.83649 13.3312 6.6936 15.6589 6.23058C17.9867 5.76755 20.3995 6.00519 22.5922 6.91345C24.7849 7.8217 26.6591 9.35977 27.9776 11.3332C29.2962 13.3065 30 15.6266 30 18C30 21.1826 28.7357 24.2348 26.4853 26.4853C24.2349 28.7357 21.1826 30 18 30ZM24 16.5H12C11.6022 16.5 11.2207 16.658 10.9393 16.9393C10.658 17.2206 10.5 17.6022 10.5 18C10.5 18.3978 10.658 18.7794 10.9393 19.0607C11.2207 19.342 11.6022 19.5 12 19.5H24C24.3978 19.5 24.7794 19.342 25.0607 19.0607C25.342 18.7794 25.5 18.3978 25.5 18C25.5 17.6022 25.342 17.2206 25.0607 16.9393C24.7794 16.658 24.3978 16.5 24 16.5Z"
                                fill="#C4C4C4" />
                        </svg>
                        <svg v-else width="36" height="36" viewBox="0 0 36 36" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_6453_34816)">
                                <path
                                    d="M16.5 16.5V10.5H19.5V16.5H25.5V19.5H19.5V25.5H16.5V19.5H10.5V16.5H16.5ZM18 33C9.7155 33 3 26.2845 3 18C3 9.7155 9.7155 3 18 3C26.2845 3 33 9.7155 33 18C33 26.2845 26.2845 33 18 33ZM18 30C21.1826 30 24.2348 28.7357 26.4853 26.4853C28.7357 24.2348 30 21.1826 30 18C30 14.8174 28.7357 11.7652 26.4853 9.51472C24.2348 7.26428 21.1826 6 18 6C14.8174 6 11.7652 7.26428 9.51472 9.51472C7.26428 11.7652 6 14.8174 6 18C6 21.1826 7.26428 24.2348 9.51472 26.4853C11.7652 28.7357 14.8174 30 18 30Z"
                                    fill="#C4C4C4" />
                            </g>
                            <defs>
                                <clipPath id="clip0_6453_34816">
                                    <rect width="36" height="36" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <!-- <Transition> -->
                    <div class="faq-answer" v-if="faq.showAnswer">
                        {{ faq.answer }}
                    </div>
                    <!-- </Transition> -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
	components: {},
	layout: "referral",
	middleware: ["initAuth", "authReq"],
	head() {
		return {
			title: "Neo - Referral",
		};
	},
	data() {
		return {
			faqs: [
				{
					id: "q3",
					question: "What is the Neo Referral Program?",
					answer:
						"We're delighted to give back to our loyal Foyr Neo users. If you're a fan of the software, refer your friends and get rewarded for it. Not only you, your friend will get exclusive discounts as well!",
					showAnswer: false,
				},
				{
					id: "q4",
					question: "What all rewards are available?",
					answer:
						"We offer a variety of rewards based on your Foyr Neo plan including custom model credits, render credits, free access to paid addons, discounts and MUCH MORE!",
					showAnswer: false,
				},
				{
					id: "q5",
					question: "How can I refer a friend?",
					answer: `Just click on "refer now" and add your friend's email ID. They will get an email to sign up for the free trial.`,
					showAnswer: false,
				},
				{
					id: "q6",
					question: "How do I know if my friend has signed up?",
					answer:
						"You will get an email informing you that your friend has signed up for a Neo plan and you have a reward waiting for you. ",
					showAnswer: false,
				},
				{
					id: "q7",
					question: "How do I claim a reward?",
					answer:
						"When your friends sign up for a new plan, a reward becomes available to you on the 'Track Reward Progress' page. Simply click 'Claim' and you will get redirected to a page where you can choose your preferred reward option",
					showAnswer: false,
				},
				{
					id: "q8",
					question:
						"What is the maximum number of friends I can refer?",
					answer:
						"There is no cap on the number of friends you can refer. The more the merrier!",
					showAnswer: false,
				},
			],
		};
	},
	watch: {},
	computed: {},
	methods: {
		toggleFaqAnswers(faq) {
			faq.showAnswer = !faq.showAnswer;
		},
	},
};
</script>
<style lang="scss" scoped>
.faq-header {
	align-self: flex-start;
	font-weight: 700;
	font-size: 2.5rem * 1.22;
	line-height: 120%;
	margin-bottom: 4rem * 1.22;
}

.faq-wrapper {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	border-radius: 0.75rem * 1.22;
	font-size: 1.5rem * 1.22;
	line-height: 2.25rem * 1.22;
}

.faq {
	cursor: pointer;
	width: 100%;
	background-color: $color-white;
	border-radius: 0.75rem * 1.22;
	padding: 1.25rem * 1.22 1.75rem * 1.22;
	margin-bottom: 2rem * 1.22;

	&-question {
		display: flex;
		width: 100%;
		font-weight: 600;
		justify-content: space-between;
	}

	&-answer {
		font-weight: 400;
		display: flex;
		width: 95%;
		color: #3a393a;
	}
}

// .v-enter-active,
// .v-leave-active {
//   transition: opacity 0.3s ease;
// }

// .v-enter-from,
// .v-leave-to {
//   opacity: 0
// }
</style>
