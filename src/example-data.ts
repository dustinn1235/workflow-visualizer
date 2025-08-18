export const exampleNodeDefinitions = [
  { id: "start" },
  { id: "ageCheck" },
  { id: "pin" },
  { id: "ageDecline" },
  { id: "end" },
];

export const exampleEdgeDefinitions = [
  { source: "start", target: "ageCheck" },
  { source: "ageCheck", target: "pin", label: "Continue" },
  { source: "ageCheck", target: "ageDecline", label: "Decline" },
  { source: "ageDecline", target: "end" },
  { source: "pin", target: "end" },
];

export const exampleInputText = `
   const nodes = [
      new StartNode('start'),
      new ExpectationNode('expectationAboutYourself', {
        currentStep: ExpectationScreenStep.ABOUT_YOURSELF,
        availableSteps: [
          ExpectationScreenStep.ABOUT_YOURSELF,
          ExpectationScreenStep.VERIFY_IDENTITY,
          ExpectationScreenStep.SETUP_CARD,
        ],
      }),
      new NameNode('name'),
      new DobNode('dob'),
      new AddressNode('address'),
      new EmploymentNode('employment'),
      new HousingNode('housing'),
      new IncomeNode('income', this.annualIncomeStorageEncryption),
      new HouseholdIncomeNode('householdIncome', this.annualHouseholdIncomeStorageEncryption),
      new InformationReviewNode('informationReview'),
      new PrimaryChecksNode(
        'primaryChecks',
        this.primaryChecksRequestedProducer,
        this.applicationRepository,
        this.applicationConfigRepository,
        this.annualIncomeStorageEncryption,
        this.annualIncomeTransportEncryption,
        this.annualHouseholdIncomeStorageEncryption,
        this.annualHouseholdIncomeTransportEncryption,
        {
          checksToRun: [
            Check.KYC_CHECK,
            Check.TRANSUNION_SOFT_CREDIT_CHECK,
            Check.TRANSUNION_EBVS_ID_CHECK,
            Check.IOVATION_DIGITAL_FRAUD_CHECK,
            Check.ENSTREAM_ACCOUNT_INTEGRITY_CHECK,
            Check.ENSTREAM_IDENTITY_VERIFICATION_CHECK,
            Check.ADJUDICATION_CHECK,
            Check.FRAUD_VENDOR_CHECK,
            Check.AML_SCREENING_CHECK,
          ],
        },
      ),
      new AgeCheckNode('ageCheck'),
      new DeclineNode('ageCheckDecline', { declineReason: DeclineReason.AGE }, this.applicationRepository),
      new IncomeCheckNode(
        'incomeCheck',
        this.applicationConfigRepository,
        this.applicationRepository,
        this.annualIncomeStorageEncryption,
        this.annualHouseholdIncomeStorageEncryption,
      ),
      new ExpectationNode('expectationVerifyIdentity', {
        currentStep: ExpectationScreenStep.VERIFY_IDENTITY,
        availableSteps: [
          ExpectationScreenStep.ABOUT_YOURSELF,
          ExpectationScreenStep.VERIFY_IDENTITY,
          ExpectationScreenStep.SETUP_CARD,
        ],
      }),
      new DecisionNode('decision'),
      new ManualReviewNode(
        'manualReview',
        this.zendeskApplicationReviewTicketerProvider,
        this.applicationRepository,
        this.applicationConfigRepository,
      ),
      new DeclineNode('creditDecline', { declineReason: DeclineReason.CREDIT }, this.applicationRepository),
      new ApproveNode('approve', this.applicationRepository),
      new SkipHardCreditCheckDecisionNode('skipHardCreditCheckDecision'),
      new HardCreditCheckNode('hardCreditCheck', this.hardCreditCheckRequestedProducer),
      new PinNode('pin'),
      new ApplicationCompletedNode('applicationCompleted', this.applicationRepository),
      new EndNode('end'),
    ];
    const edges = [
      new Edge({
        sourceNodeId: 'start',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'expectationAboutYourself',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'expectationAboutYourself',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'name',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'name',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'dob',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'dob',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'address',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'address',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'employment',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'employment',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'housing',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'housing',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'income',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'income',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'householdIncome',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'householdIncome',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'informationReview',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'informationReview',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'primaryChecks',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'primaryChecks',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'ageCheck',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'ageCheck',
        sourcePinId: 'outputNavigationPinContinue',
        targetNodeId: 'incomeCheck',
        targetPinId: 'inputNavigationPin',
      }),
      // duplicate pii check node
      new Edge({
        sourceNodeId: 'incomeCheck',
        sourcePinId: 'outputNavigationPinContinue',
        targetNodeId: 'expectationVerifyIdentity',
        targetPinId: 'inputNavigationPin',
      }),
      // cl config node
      new Edge({
        sourceNodeId: 'expectationVerifyIdentity',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'decision',
        targetPinId: 'inputNavigationPin',
      }),
      //skip id verification decision node
      new Edge({
        sourceNodeId: 'decision',
        sourcePinId: 'outputNavigationPinContinue',
        targetNodeId: 'approve',
        targetPinId: 'inputNavigationPin',
      }),
      // checkout node
      // agreement node
      new Edge({
        sourceNodeId: 'approve',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'skipHardCreditCheckDecision',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'skipHardCreditCheckDecision',
        sourcePinId: 'outputNavigationPinContinue',
        targetNodeId: 'pin',
        targetPinId: 'inputNavigationPin',
      }),
      // skip security fund decision node
      // card/account creation node
      // subscribe to membership node
      new Edge({
        sourceNodeId: 'pin',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'applicationCompleted',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'applicationCompleted',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'end',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'ageCheck',
        sourcePinId: 'outputNavigationPinDecline',
        targetNodeId: 'ageCheckDecline',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'ageCheckDecline',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'end',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'incomeCheck',
        sourcePinId: 'outputNavigationPinRoute',
        targetNodeId: 'end',
        targetPinId: 'inputNavigationPin',
      }),
      // product selection node
      new Edge({
        sourceNodeId: 'decision',
        sourcePinId: 'outputNavigationPinDecline',
        targetNodeId: 'creditDecline',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'creditDecline',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'end',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'decision',
        sourcePinId: 'outputNavigationPinManualReview',
        targetNodeId: 'manualReview',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'manualReview',
        sourcePinId: 'outputNavigationPinDecline',
        targetNodeId: 'creditDecline',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'manualReview',
        sourcePinId: 'outputNavigationPinApprove',
        targetNodeId: 'approve',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'skipHardCreditCheckDecision',
        sourcePinId: 'outputNavigationPinHardCreditCheck',
        targetNodeId: 'hardCreditCheck',
        targetPinId: 'inputNavigationPin',
      }),
      new Edge({
        sourceNodeId: 'hardCreditCheck',
        sourcePinId: 'outputNavigationPin',
        targetNodeId: 'pin',
        targetPinId: 'inputNavigationPin',
      }),
    ];
`;
