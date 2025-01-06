const MockData = {
    uuid : {
      uuid: "a0b1c2",
    },
    popupText : ["Your Return Code is: "],
    startTexts : {
      reload_label: ["Already started the Self-Assessment?"],
      reload_button: ["Reload again"],
      title: ["Start"],
      subtitle: ["Dear participant,"],
      text1: [
        "Welcome to the CCAM (Cooperative Connected and Automated Mobility) Self-Assessment tool. ",
      ],
      text2: [
        "This tool provides a simplified entry point for planners, supporting in the assessment of key questions to assess local challenges, opportunities, risks, and requirements for the deployment of CCAM services.  ",
      ],
      text3: [
        "We invite you to reply to use it as basis of your planning efforts for CCAM implementation and regulation, at the city, regional or functional urban area.",
      ],
      text4: [
        "The tool will guide you through a concise questionnaire to evaluate your area's level CCAM-readiness across relevant mobility aspects. After completion, your self-assessment's results will be accompanied by tailored recommendations, tools, and good practice examples to guide your next steps towards CCAM-readiness.",
      ],
      start_button: ["Start CCAM Self-Assessment"],
      finish_text: [
        "The CCAM Self-Assessment Tool is currently undergoing a testing and validation process. Thank you for your feedback and collaboration. ",
      ],
    },
    navigationTexts : {
      // categories: [
      //   "Respondent Profile",
      //   "Pre-Self-Assessment",
      //   "Policy and Strategy",
      //   "Mobility Management and Regulation",
      //   "Organisational und Personnel",
      //   "Infrastructure and Traffic Management",
      //   "Stakeholder and Management",
      // ],
      title: ["CCAM Self-Assessment Tool"],
      result_text: ["Results"],
      imprint: ["Imprint"],
      data_privacy: ["Privacy policy"],
      start_text: ["Start"],
    },
    questionText1 : {
      assessment: 1,
      questions: null,
    },
    questionText0 : {
      assessment: 1,
      questions: [
        {
          id: 1,
          title:
            "We would first invite you to provide some background information about yourself and your area",
          subTitle: "",
          category: "Respondent Profile",
          answers: [{ translation: "", type: 0 }],
          selectedAnswers: [],
          type: "instruction",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 2,
          title:
            "Name of the area of interest (city, region, or functional urban area - FUA) for which you are completing the CCAM Self-Assessment",
          subTitle: "",
          category: "Respondent Profile",
          answers: [{ translation: "", type: 0 }],
          selectedAnswers: [],
          type: "text",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 3,
          title: "In which country is your area located in?",
          subTitle: "",
          category: "Respondent Profile",
          answers: [
            { translation: "Austria", type: 0 },
            { translation: "Belgium", type: 0 },
            { translation: "Bulgaria", type: 0 },
            { translation: "Croatia", type: 0 },
            { translation: "Cyprus", type: 0 },
            { translation: "Czech Republic", type: 0 },
            { translation: "Denmark", type: 0 },
            { translation: "Estonia", type: 0 },
            { translation: "Finland", type: 0 },
            { translation: "France", type: 0 },
            { translation: "Germany", type: 0 },
            { translation: "Greece", type: 0 },
            { translation: "Hungary", type: 0 },
            { translation: "Ireland", type: 0 },
            { translation: "Italy", type: 0 },
            { translation: "Latvia", type: 0 },
            { translation: "Lithuania", type: 0 },
            { translation: "Luxembourg", type: 0 },
            { translation: "Malta", type: 0 },
            { translation: "Netherlands", type: 0 },
            { translation: "Poland", type: 0 },
            { translation: "Portugal", type: 0 },
            { translation: "Romania", type: 0 },
            { translation: "Slovakia", type: 0 },
            { translation: "Slovenia", type: 0 },
            { translation: "Spain", type: 0 },
            { translation: "Sweden", type: 0 },
          ],
          selectedAnswers: [],
          type: "dropdown",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 4,
          title:
            "What type of area are you considering for the self-assessment exercise? ",
          subTitle: "",
          category: "Respondent Profile",
          answers: [
            { translation: "A core city", type: 0 },
            {
              translation:
                "It is a smaller city in the surrounding of the core city",
              type: 0,
            },
            {
              translation:
                "It is one of several cities of similar size (polycentric region)  ",
              type: 0,
            },
            { translation: "It is a district or neighbourhood", type: 0 },
            { translation: "It is a regional organization, not a city", type: 0 },
            { translation: "I don't know", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 5,
          title:
            "Population of the city, region, district/neighbourhood, or functional urban area",
          subTitle: "",
          category: "Respondent Profile",
          answers: [
            { translation: "Less than 25,000", type: 0 },
            { translation: "25,000 to 50,000", type: 0 },
            { translation: "50,000 to 100,000", type: 0 },
            { translation: "100,000 to 250,000", type: 0 },
            { translation: "250,000 to 500,000", type: 0 },
            { translation: "500,000 to 1 million", type: 0 },
            { translation: "More than 1 million", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 6,
          title:
            "What is your role or type of involvement in mobility planning activities?",
          subTitle: "",
          category: "Respondent Profile",
          answers: [
            {
              translation: "Member of public mobility department (or equivalent)",
              type: 0,
            },
            {
              translation:
                "Member of another public department (e.g., environment, urban planning)",
              type: 0,
            },
            {
              translation: "Policy Decision maker (e.g., in the local council)",
              type: 0,
            },
            {
              translation:
                "Mobility stakeholder (service provider, operator, manager, etc.)",
              type: 0,
            },
            {
              translation:
                "Mobility stakeholder (service provider, operator, manager, etc.)",
              type: 0,
            },
            { translation: "Other private sector stakeholders", type: 0 },
            { translation: "Representative of civil society", type: 0 },
            { translation: "I am not involved", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 7,
          title:
            "Before starting with the questionnaire, please reflect about the current capabilities of your local authorities and mobility stakeholders to plan for CCAM and the status of such activities",
          subTitle: "",
          category: "Pre-Self-Assessment",
          answers: [],
          selectedAnswers: [],
          type: "instruction",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 8,
          title:
            "How would you evaluate your area's level of automation-readiness (i.e., capacity to make structure and informed decisions about CCAM)?",
          subTitle: "",
          category: "Pre-Self-Assessment",
          answers: [
            { translation: "1 - non existent", type: 0 },
            { translation: "2 - low", type: 0 },
            { translation: "3 - moderate", type: 0 },
            { translation: "4 - high", type: 0 },
            { translation: "5 - very high", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 9,
          title: "At which level of CCAM planning would you place your area?",
          subTitle: "",
          category: "Pre-Self-Assessment",
          answers: [
            {
              translation:
                "Learning about CCAM, its challenges and opportunities",
              type: 0,
            },
            { translation: "Definition of CCAM concept and scenarios ", type: 0 },
            {
              translation: "Development of concrete action plans and strategies",
              type: 0,
            },
            {
              translation: "Development of concrete action plans and strategies",
              type: 0,
            },
            {
              translation: "CCAM services have already been fully implemented",
              type: 0,
            },
            { translation: "I don't know ", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 10,
          title: "Conceptual Approach",
          subTitle: `Understanding automation-readiness, as 'the capability of making structured and informed 
                  decisions about the comprehensive deployment of CCAM', the CCAM-readiness Self-Assessment Tool has 
                  been designed to guide the assessment of a city's/region's current stand in relation to CCAM deployment 
                  and what the next steps could be to get 'automation-ready'. <br>
                  The tool is structured along the conceptual 
                  approach of the 'automation-ready framework', which propose three phases of strategic action CCAM in 
                  urban mobility planning processes: Automation awareness raising, Planning for Automation-readiness, 
                  Preparing for the implementation of automation-ready measures. These different stages do not correspond 
                  to strictly sequential periods, as different cities may be in a different phase depending on local 
                  circumstances. And they can be overlapping, parallel and interlinked. Yet, it provides a structured 
                  framework aims to reduce uncertainties and encourage proactive CCAM planning. <br>
                  For more information, please see: 
                  <a href:"https://www.h2020-coexist.eu/wp-content/uploads/2020/05/D1.2_Automation-Ready-Framework.pdf">Automation-Ready Framework</a>
                  <br>
                  `,
          category: "Pre-Self-Assessment",
          answers: [],
          selectedAnswers: [],
          type: "instruction",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 11,
          title: "",
          subTitle: `Policies and strategies are the foremost tools to create, implement and manage a transport 
                  infrastructure of a city. This includes involvement, cooperation and governance of many stakeholders 
                  and the governing bodies. To integrate and implement a new form of mobility, new action plans must be 
                  developed for the different phases and stakeholders have to adapt to new methods to guide the development 
                  of the same. This section aims to gather information about the status quo of action plans for CCAM in 
                  your city infrastructure. 
                  `,
          category: "Policy and Strategy",
          answers: [],
          selectedAnswers: [],
          type: "instruction",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 12,
          title: "Is there a strategy for CCAM in your area?",
          subTitle: "",
          category: "Policy and Strategy",
          answers: [
            { translation: "Not yet", type: 0 },
            { translation: "There is a joint vision for a strategy", type: 0 },
            {
              translation:
                "CCAM strategy is outlined in the SUMP / general mobility plan ",
              type: 0,
            },
            { translation: "There is a strategy for CCAM ", type: 0 },
            {
              translation:
                "Advanced implementation of strategic measures for CCAM",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 13,
          title: "How is the topic of CCAM strategically addressed in your area?",
          subTitle: "",
          category: "Policy and Strategy",
          answers: [
            { translation: "It is not relevant / not embedded ", type: 0 },
            {
              translation:
                "It is relevant but opportunities and feasibility have not been studied",
              type: 0,
            },
            {
              translation:
                "General impacts and opportunities of CCAM have been investigated ",
              type: 0,
            },
            {
              translation:
                "Specific implementation scenarios have been studied/selected to address local mobility needs",
              type: 0,
            },
            {
              translation:
                "CCAM scenarios have been tested in living labs/pilot projects",
              type: 0,
            },
            {
              translation:
                "There is a strategy for the regular monitoring and evaluation of CCAM areas of application and regulatory measures ",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 14,
          title:
            "Is there a strategy for the integration of CCAM in public transport? ",
          subTitle: "",
          category: "Policy and Strategy",
          answers: [
            {
              translation: "CCAM in public transport is not addressed ",
              type: 0,
            },
            {
              translation: "There is a vision for CCAM in public transport ",
              type: 0,
            },
            {
              translation:
                "There is a fixed strategy for the implementation of CCAM measures in public transport ",
              type: 0,
            },
            {
              translation:
                "CCAM-pilots for passenger services integrated with public transport have been conducted",
              type: 0,
            },
            {
              translation:
                "Regular CCAM passenger services integrated with public transport have been deployed ",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 15,
          title:
            "Is there a strategy for the integration of CCAM in freight transport?",
          subTitle: "",
          category: "Policy and Strategy",
          answers: [
            {
              translation: "CCAM in freight transport is not addressed ",
              type: 0,
            },
            { translation: "There is a joint vision ", type: 0 },
            {
              translation:
                "There is a fixed strategy for the implementation of CCAM measures in freight transport ",
              type: 0,
            },
            {
              translation:
                "CCAM-pilots/tests for logistic services have been conducted ",
              type: 0,
            },
            {
              translation: "Regular CCAM logistic services have been deployed ",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 16,
          title:
            "Is there a strategy for the implementation of CCAM solutions for parking & stationary traffic?",
          subTitle: "",
          category: "Policy and Strategy",
          answers: [
            {
              translation:
                "Parking & stationary traffic is not addressed in the CCAM ",
              type: 0,
            },
            { translation: "There is a joint vision ", type: 0 },
            {
              translation:
                "There is a fixed concept for the implementation of CCAM measures ",
              type: 0,
            },
            {
              translation:
                "CCAM measures for stationary traffic have been tested in some areas (e.g., valet parking, smart parking) ",
              type: 0,
            },
            {
              translation:
                "CCAM measures are implemented in the whole municipality ",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 17,
          title:
            "Is there a strategy for C-ITS (Cooperative Intelligent Transport Systems)? ",
          subTitle: "",
          category: "Policy and Strategy",
          answers: [
            { translation: "There is no strategy", type: 0 },
            { translation: "There is a joint vision ", type: 0 },
            {
              translation:
                "C-ITS strategy is outlined in the SUMP / general mobility plan",
              type: 0,
            },
            { translation: "There is a strategy for C-ITS ", type: 0 },
            {
              translation:
                "C-ITS solutions have been implemented/tested (e.g., in pilot projects) ",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 18,
          title: "",
          subTitle: `Mobility management refers to the creation, implementation and managing of mobility options, at every level of a transport 
                  infrastructure to improve the accessibility, efficiency, and usage of public transportation services by the users. These mobility options could 
                  be integrated into a coherent network where every user including cyclists, pedestrians could easily choose their mode of transport. Mobility 
                  hubs represent these integration of various public transportation modes at a particular location of the city or region with an integrated 
                  holistic network of various modes facilitating passengers to select their preferred mode very conveniently.  <br><br>
                  This section deals with important questions to know more about the level of integrated transport services that your city, region or 
                  FUA is equipped with and your knowledge about the impacts and regulations of connected cooperative and automated mobility.  
                  `,
          category: "Mobility Management and Regulation",
          answers: [],
          selectedAnswers: [],
          type: "instruction",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 19,
          title:
            "Are there considerations for the co-existence of vulnerable road users (e.g., pedestrians, cyclists) with CCAM in terms of safety, space allocation?  ",
          subTitle: "",
          category: "Mobility Management and Regulation",
          answers: [
            {
              translation: "No, these challenges have not been analysed ",
              type: 0,
            },
            { translation: "Mobility Management and Regulation ", type: 0 },
            {
              translation:
                "Yes, it has been analysed and considered in the CCAM strategy",
              type: 0,
            },
            { translation: "I don't know", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 20,
          title:
            "How familiar are you with the applicable regulatory framework / normative for CCAM?",
          subTitle: "",
          category: "Mobility Management and Regulation",
          answers: [
            { translation: "It is not known", type: 0 },
            { translation: "It is known but not familiar ", type: 0 },
            {
              translation:
                "It is known and there have initial experience in implementing it (e.g., special permits for pilot projects) ",
              type: 0,
            },
            { translation: "It is well known", type: 0 },
            {
              translation: "There is a local statute for CCAM in your area",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 21,
          title:
            "How familiar are you with the expected impacts of CCAM on your existing local mobility goals? ",
          subTitle: "",
          category: "Mobility Management and Regulation",
          answers: [
            { translation: "1 - Not at all ", type: 0 },
            { translation: "2 - Slightly  ", type: 0 },
            { translation: "3 - Moderately", type: 0 },
            { translation: "4 - Very ", type: 0 },
            { translation: "5 - Extremely Familiar ", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 22,
          title:
            "Have you assessed the potential consequences of CCAM implementation in your area?",
          subTitle: "",
          category: "Mobility Management and Regulation",
          answers: [
            { translation: "No", type: 0 },
            {
              translation:
                "Have assessed the general potentials (advantages and disadvantages) of CCAM",
              type: 0,
            },
            {
              translation:
                "Studied of the expected impacts of specific CCAM deployment scenarios (use case modelling/simulations)",
              type: 0,
            },
            {
              translation:
                "CCAM solutions have been tested and evaluated through pilot projects",
              type: 0,
            },
            {
              translation:
                "CCAM assessment (impacts, opportunities, and risks) is an integral part of every mobility project",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 23,
          title:
            "What is the level of integration of mobility services in your area (i.e., Mobility as a Service strategy)?",
          subTitle: "",
          category: "Mobility Management and Regulation",
          answers: [
            {
              translation: "There is no mobility service integration yet",
              type: 0,
            },
            {
              translation:
                "The prerequisites are in place (mobility providers provide information on timetables, tariff options etc.).",
              type: 0,
            },
            {
              translation:
                "There is a Mobility as a Service strategy in place (incl. platform with integrated tariff, service offer etc.)",
              type: 0,
            },
            { translation: "I don't know", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 24,
          title:
            "Is there intermodal networking of the different modes of transport (with Mobility Hubs or similar)?",
          subTitle: "",
          category: "Mobility Management and Regulation",
          answers: [
            {
              translation: "There is no intermodal networking in place",
              type: 0,
            },
            {
              translation:
                "There are isolated Mobility-Hubs with multimodal integration",
              type: 0,
            },
            {
              translation:
                "There are Mobility-Hubs with multimodal integration throughout the area",
              type: 0,
            },
            { translation: "I don't know", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 25,
          title: "",
          subTitle: `CCAM is a new innovative form of mobility which although has the potential to make 
                  transport infrastructure more sustainable, resilient, and efficient, poses new challenges for 
                  authorities and mobility stakeholders to plan, implement and operate integrated multimodal transport 
                  networks, which requires new skills, agile decision-making, and governance structures. This 
                  section aims to get the information as to what extent the concept of CCAM is organisationally 
                  structured in your infrastructure and how you are planning to progress with the same.`,
          category: "Organisational und Personnel",
          answers: [],
          selectedAnswers: [],
          type: "instruction",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 26,
          title:
            "How is the topic of CCAM organisationally embedded in your municipality?",
          subTitle: "",
          category: "Organisational und Personnel",
          answers: [
            { translation: "It is not relevant / not embedded", type: 0 },
            { translation: "There is one person assigned to CCAM", type: 0 },
            {
              translation:
                "There is one department that has CCAM as a secondary task",
              type: 0,
            },
            {
              translation:
                "CCAM is embedded decentralised in several departments",
              type: 0,
            },
            {
              translation: "There is an interdepartmental working group",
              type: 0,
            },
            {
              translation:
                "There is a mobility unit set up specifically for CCAM",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 27,
          title:
            "How often is cross-sectorial / inter-departmental cooperation for CCAM planning taking place in your area?",
          subTitle: "",
          category: "Organisational und Personnel",
          answers: [
            { translation: "There is no cooperation", type: 0 },
            {
              translation: "Sporadic (if necessary/project-specific) cooperation",
              type: 0,
            },
            {
              translation:
                "Regular cooperation (coordinated exchanges on a regular basis)",
              type: 0,
            },
            {
              translation:
                "Systemic and continuous cooperation (centralised with continuous information exchange)",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 28,
          title:
            "Have you undertaken any capacity building measures/efforts to increase the capacities of local authorities to address CCAM? (multiple choice)",
          subTitle: "",
          category: "Organisational und Personnel",
          answers: [
            { translation: "No", type: 0 },
            {
              translation:
                "By participating in fairs and events on CCAM, knowledge is expanded and a network with further actors / partners is established. (As visitor / exhibitor)",
              type: 0,
            },
            {
              translation:
                "The necessary competences for CCAM planning were examined and gaps were identified",
              type: 0,
            },
            {
              translation:
                "Capacity/knowledge gaps are actively addressed through training programmes",
              type: 0,
            },
            {
              translation:
                "Knowledge and skills to implement CCAM (personnel and tools) are available",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "checkbox",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 29,
          title: "",
          subTitle: `The transport network and infrastructure of the city are the tools that control 
                  and operate the different transport facilities of the area making the specific modes available 
                  to the users. For the introduction and operation of CCAM, the infrastructure and the traffic 
                  management of the city should be capable of dealing and reacting to the new changes in the system 
                  and the impacts of CCAM. The infrastructure must also be digitally equipped as communication of 
                  the vehicle with the infrastructure and the users plays a very important role. This section aims to 
                  address the overall capacity or framework of your city, region or FUA to support CCAM. `,
          category: "Infrastructure and Traffic Management",
          answers: [],
          selectedAnswers: [],
          type: "instruction",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 30,
          title:
            "Have you studied the impact of CCAM on the existing infrastructure?",
          subTitle: "",
          category: "Infrastructure and Traffic Management",
          answers: [
            { translation: "No", type: 0 },
            {
              translation:
                "Assessed general expected impacts on the infrastructure",
              type: 0,
            },
            {
              translation:
                "Studied the effects of specific CCAM implementation scenarios on the infrastructure (modelling/simulations)",
              type: 0,
            },
            {
              translation:
                "Design solutions and infrastructure adaptations for CCAM have been tested in pilot projects",
              type: 0,
            },
            {
              translation:
                "Analysis of CCAM effects on infrastructure is an integral part of every mobility / infrastructure development project",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 31,
          title:
            "Is your area equipped with digital infrastructure to support the V2V, V2I and V2X functionalities of connected mobility (and CCAM)?",
          subTitle: "",
          category: "Infrastructure and Traffic Management",
          answers: [
            { translation: "I don't know", type: 0 },
            { translation: "No, so far there is none", type: 0 },
            { translation: "Initial deployment in planning phase", type: 0 },
            { translation: "Tested in some pilot projects", type: 0 },
            { translation: "Implemented in individual areas", type: 0 },
            { translation: "Implemented throughout the municipal area", type: 0 },
            {
              translation:
                "(Digital) infrastructures for CCAM are an integral part of the planning or standard for new road construction / modernisation",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 32,
          title:
            "Does the area count with advanced traffic management capabilities (for real-time cooperative management)?",
          subTitle: "",
          category: "Infrastructure and Traffic Management",
          answers: [
            { translation: "No", type: 0 },
            { translation: "It is tested in pilot projects", type: 0 },
            { translation: "There is real-time incident management", type: 0 },
            {
              translation:
                "There is cooperative incident management by multiple stakeholders",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 33,
          title: "",
          subTitle: `The transport network and infrastructure of the city are the tools that control 
                  and operate the different transport facilities of the area making the specific modes available 
                  to the users. For the introduction and operation of CCAM, the infrastructure and the traffic 
                  management of the city should be capable of dealing and reacting to the new changes in the system 
                  and the impacts of CCAM. The infrastructure must also be digitally equipped as communication of 
                  the vehicle with the infrastructure and the users plays a very important role. This section aims to 
                  address the overall capacity or framework of your city, region or FUA to support CCAM. `,
          category: "Stakeholder and Management",
          answers: [],
          selectedAnswers: [],
          type: "instruction",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 34,
          title:
            "How often are local stakeholders involved in CCAM planning and/or implementation?",
          subTitle: "",
          category: "Stakeholder and Management",
          answers: [
            { translation: "Not at all", type: 0 },
            { translation: "Sporadically", type: 0 },
            { translation: "Frequently", type: 0 },
            { translation: "Usually", type: 0 },
            { translation: "Always", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 35,
          title:
            "From which of the following stakeholders have mobility needs/preferences been collected? (Multiple choice)",
          subTitle: "",
          category: "Stakeholder and Management",
          answers: [
            { translation: "Citizens", type: 0 },
            { translation: "Research Organisations", type: 0 },
            {
              translation:
                "Local interest groups (e.g., taxi driver associations, cycling associations, environmental protection groups etc.)",
              type: 0,
            },
            {
              translation:
                "Associations representing 'vulnerable users' (e.g., children, disabled people, cycling associations? elderly people)",
              type: 0,
            },
            { translation: "Local business associations", type: 0 },
            { translation: "Transport operators", type: 0 },
            { translation: "Traffic police and/or emergency services", type: 0 },
            {
              translation:
                "Regional stakeholders (e.g., from neighbouring municipalities)",
              type: 0,
            },
            { translation: "I don't know", type: 0 },
          ],
          selectedAnswers: [],
          type: "checkbox",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 36,
          title:
            "Have measures been taken to increase awareness and/or understanding of CCAM by citizens like public pilot launch events, surveys, open consultations etc.?",
          subTitle: "",
          category: "Stakeholder and Management",
          answers: [
            { translation: "No", type: 0 },
            {
              translation:
                "Sporadically (e.g., through public pilot launch events)",
              type: 0,
            },
            {
              translation:
                "Yes, regularly (e.g., through surveys, open consultations)",
              type: 0,
            },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
        {
          id: 37,
          title:
            "Are user's potential needs and preferences on CCAM have been assessed in your area's planning processes?",
          subTitle: "",
          category: "Stakeholder and Management",
          answers: [
            { translation: "No", type: 0 },
            { translation: "Yes, irregularly / sporadically", type: 0 },
            { translation: "Yes, regularly", type: 0 },
          ],
          selectedAnswers: [],
          type: "radio",
          mandatory: 0,
          filterReq: [],
          filterAdd: {},
        },
      ],
      questionTranslationData: {
        button_next: ["Next"],
        button_previous: ["Previous"],
        button_restart: ["Restart Self-Assessment"],
        checkbox_error_message: ["please choose at least one answer"],
        dropdown_error_message: ["Something must be selected"],
        free_placeholder: ["Pleaser answer here..."],
        pie_chart_remaining: ["% remaining"],
        radio_error_message: ["Please choose one answer"],
        select_placeholder_text: ["Country Name"],
        your_code_text: ["Your Code:"],
      },
    },
  }
  
module.exports = MockData