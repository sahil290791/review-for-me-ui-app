export const ACTION_PROMPTS = [{
    promptType: 'action_adventure_genre',
    promptQuery: 'Where would you prefer the action to take place?',
    promptLabel: "Action/Adventure",
    relatedPrompts: [{ promptType: 'urban_environment_action' }, { promptType: 'historical_period_action' }, { promptType: 'futuristic_world_action' }, { promptType: 'jungle_wildrness_action' }, {promptType: 'restart'}],
    priority: 2,
    handleLocally: true,
}, {
    promptType: 'urban_environment_action',
    promptQuery: 'What kind of main character do you prefer in an action <contentType>?',
    promptLabel: "Urban environment",
    relatedPrompts: [{ promptType: 'tough_and_grity_lone_hero_action' }, { promptType: 'skilled_and_charismatic_team_action' }, { promptType: 'underdog_who_rises_to_the_challenge_action'}, { promptType: 'any_type_of_character_action'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "Urban environment";
    },
}, {
    promptType: 'historical_period_action',
    promptQuery: 'What kind of main character do you prefer in an action <contentType>?',
    promptLabel: "Historical period",
    relatedPrompts: [{ promptType: 'tough_and_grity_lone_hero_action' }, { promptType: 'skilled_and_charismatic_team_action' }, { promptType: 'underdog_who_rises_to_the_challenge_action'}, { promptType: 'any_type_of_character_action'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "Historical period";
    },
}, {
    promptType: 'futuristic_world_action',
    promptQuery: 'What kind of main character do you prefer in an action <contentType>?',
    promptLabel: "Futuristic world",
    relatedPrompts: [{ promptType: 'tough_and_grity_lone_hero_action' }, { promptType: 'skilled_and_charismatic_team_action' }, { promptType: 'underdog_who_rises_to_the_challenge_action'}, { promptType: 'any_type_of_character_action'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "Futuristic world";
    },
}, {
    promptType: 'jungle_wildrness_action',
    promptQuery: 'What kind of main character do you prefer in an action <contentType>?',
    promptLabel: "Jungle/Wilderness",
    relatedPrompts: [{ promptType: 'tough_and_grity_lone_hero_action' }, { promptType: 'skilled_and_charismatic_team_action' }, { promptType: 'underdog_who_rises_to_the_challenge_action'}, { promptType: 'any_type_of_character_action'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "Jungle/Wilderness";
    },
}, {
    promptType: 'tough_and_grity_lone_hero_action',
    promptQuery: 'Recommend an action/adventure <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>',
    promptQueryPayload: 'Recommend an action/adventure <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>',
    promptLabel: "Tough and gritty lone hero",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "tough and gritty lone hero";
    },
}, {
    promptType: 'skilled_and_charismatic_team_action',
    promptQuery: 'Recommend an action/adventure <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>',
    promptQueryPayload: 'Recommend an action/adventure <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>',
    promptLabel: "Skilled and charismatic team of heroes",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "skilled and charismatic team of heroes";
    },
}, {
    promptType: 'underdog_who_rises_to_the_challenge_action',
    promptQuery: 'Recommend an action/adventure <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>',
    promptQueryPayload: 'Recommend an action/adventure <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>',
    promptLabel: "Underdog who rises to the challenge",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "underdog who rises to the challenge";
    },
}, {
    promptType: 'any_type_of_character_action',
    promptQuery: 'Recommend an action/adventure <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>',
    promptQueryPayload: 'Recommend an action/adventure <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>',
    promptLabel: "Any type of character",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "any type of character";
    },
}];


export const COMEDY_PROMPTS = [{
    promptType: 'comedy_genre',
    promptQuery: 'Where would you prefer the comedy to take place?',
    promptLabel: "Comedy",
    relatedPrompts: [{ promptType: 'urban_environment_comedy' }, { promptType: 'small_town_comedy' }, { promptType: 'historical_fantasy_comedy' }, { promptType: 'space_other_planet_comedy' }, {promptType: 'restart'}],
    priority: 2,
    handleLocally: true,
}, {
    promptType: 'urban_environment_comedy',
    promptQuery: 'What type of humor do you enjoy the most?',
    promptLabel: "Urban environment",
    relatedPrompts: [{ promptType: 'witty_and_clever_comedy' }, { promptType: 'slapstick_physical_comedy' }, { promptType: 'satirical_and_sarcastic_comedy'}, { promptType: 'quirky_comedy'}, { promptType: 'a_mix_of_humor_comedy'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "urban environment";
    },
}, {
    promptType: 'small_town_comedy',
    promptQuery: 'What type of humor do you enjoy the most?',
    promptLabel: "Small town/rural setting",
    relatedPrompts: [{ promptType: 'witty_and_clever_comedy' }, { promptType: 'slapstick_physical_comedy' }, { promptType: 'satirical_and_sarcastic_comedy'}, { promptType: 'quirky_comedy'}, { promptType: 'a_mix_of_humor_comedy'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "small town/rural setting";
    },
}, {
    promptType: 'historical_fantasy_comedy',
    promptQuery: 'What type of humor do you enjoy the most?',
    promptLabel: "Historical/fantasy world",
    relatedPrompts: [{ promptType: 'witty_and_clever_comedy' }, { promptType: 'slapstick_physical_comedy' }, { promptType: 'satirical_and_sarcastic_comedy'}, { promptType: 'quirky_comedy'}, { promptType: 'a_mix_of_humor_comedy'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "historical/fantasy world";
    },
}, {
    promptType: 'space_other_planet_comedy',
    promptQuery: 'What type of humor do you enjoy the most?',
    promptLabel: "Space/other planets",
    relatedPrompts: [{ promptType: 'witty_and_clever_comedy' }, { promptType: 'slapstick_physical_comedy' }, { promptType: 'satirical_and_sarcastic_comedy'}, { promptType: 'quirky_comedy'}, { promptType: 'a_mix_of_humor_comedy'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "space/other planets";
    },
}, {
    promptType: 'witty_and_clever_comedy',
    promptQuery: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptQueryPayload: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptLabel: "Witty and clever dialogue",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "witty and clever dialogue";
    },
}, {
    promptType: 'slapstick_physical_comedy',
    promptQuery: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptQueryPayload: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptLabel: "Slapstick and physical comedy",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "slapstick and physical comedy";
    },
}, {
    promptType: 'satirical_and_sarcastic_comedy',
    promptQuery: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptQueryPayload: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptLabel: "Satirical and sarcastic humor",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "satirical and sarcastic humor";
    },
}, {
    promptType: 'quirky_comedy',
    promptQuery: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptQueryPayload: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptLabel: "Quirky and eccentric characters",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "quirky and eccentric characters";
    },
}, {
    promptType: 'a_mix_of_humor_comedy',
    promptQuery: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptQueryPayload: 'Recommend a comedy <contentType> set in <strong><environmentType></strong> with <strong><characterType></strong>.',
    promptLabel: "A mix of humor styles",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "a mix of humor styles";
    },
}];

export const SCI_FI_PROMPTS = [{
    promptType: 'sci_fi_genre',
    promptQuery: 'What setting do you prefer for your science fiction movie?',
    promptLabel: "Sci-FI",
    relatedPrompts: [{ promptType: 'space_outer_scifi' }, { promptType: 'futuristic_earth_scifi' }, { promptType: 'alternate_dim_scifi' }, { promptType: 'post_world_scifi' }, {promptType: 'restart'}],
    priority: 2,
    handleLocally: true,
}, {
    promptType: 'space_outer_scifi',
    promptQuery: 'How would you like the tone of the <contentType> to be?',
    promptLabel: "Space/Outer space",
    relatedPrompts: [{ promptType: 'action_packed_scifi' }, { promptType: 'thought_provoking_scifi' }, { promptType: 'light_hearted_scifi'}, { promptType: 'mysterious_and_suspensful_scifi'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "space/outer space";
    },
}, {
    promptType: 'futuristic_earth_scifi',
    promptQuery: 'How would you like the tone of the <contentType> to be?',
    promptLabel: "Futuristic Earth",
    relatedPrompts: [{ promptType: 'action_packed_scifi' }, { promptType: 'thought_provoking_scifi' }, { promptType: 'light_hearted_scifi'}, { promptType: 'mysterious_and_suspensful_scifi'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "Futuristic Earth";
    },
}, {
    promptType: 'alternate_dim_scifi',
    promptQuery: 'How would you like the tone of the <contentType> to be?',
    promptLabel: "Alternate dimension/reality",
    relatedPrompts: [{ promptType: 'action_packed_scifi' }, { promptType: 'thought_provoking_scifi' }, { promptType: 'light_hearted_scifi'}, { promptType: 'mysterious_and_suspensful_scifi'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "alternate dimension/reality";
    },
}, {
    promptType: 'post_world_scifi',
    promptQuery: 'How would you like the tone of the <contentType> to be?',
    promptLabel: "Post-apocalyptic world",
    relatedPrompts: [{ promptType: 'action_packed_scifi' }, { promptType: 'thought_provoking_scifi' }, { promptType: 'light_hearted_scifi'}, { promptType: 'mysterious_and_suspensful_scifi'}],
    priority: 2,
    handleLocally: true,
    handler: function() {
        this.environment = "post-apocalyptic world";
    },
}, {
    promptType: 'action_packed_scifi',
    promptQuery: 'Recommend a Sci-Fi <contentType> set in <strong><environmentType></strong> which is <strong><characterType></strong>',
    promptQueryPayload: 'Recommend a Sci-Fi <contentType> set in <strong><environmentType></strong> which is <strong><characterType></strong>',
    promptLabel: "Action-packed and intense",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "action-packed and intense";
    },
}, {
    promptType: 'thought_provoking_scifi',
    promptQuery: 'Recommend a Sci-Fi <contentType> set in <strong><environmentType></strong> which is <strong><characterType></strong>',
    promptQueryPayload: 'Recommend a Sci-Fi <contentType> set in <strong><environmentType></strong> which is <strong><characterType></strong>',
    promptLabel: "Thought-provoking and philosophical",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "thought-provoking and philosophical";
    },
}, {
    promptType: 'light_hearted_scifi',
    promptQuery: 'Recommend a Sci-Fi <contentType> set in <strong><environmentType></strong> which is <strong><characterType></strong>',
    promptQueryPayload: 'Recommend a Sci-Fi <contentType> set in <strong><environmentType></strong> which is <strong><characterType></strong>',
    promptLabel: "Light-hearted and humorous",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "light-hearted and humorous";
    },
}, {
    promptType: 'mysterious_and_suspensful_scifi',
    promptQuery: 'Recommend a Sci-Fi <contentType> set in <strong><environmentType></strong> which is <strong><characterType></strong>',
    promptQueryPayload: 'Recommend a Sci-Fi <contentType> set in <strong><environmentType></strong> which is <strong><characterType></strong>',
    promptLabel: "Mysterious and suspenseful",
    relatedPrompts: [{ promptType: 'free_prime_movies' }, { promptType: 'restart' }],
    priority: 2,
    handler: function() {
        this.characterType = "mysterious and suspenseful";
    },
}];