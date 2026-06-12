var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ScenaristPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian11 = require("obsidian");

// src/settings.ts
var import_obsidian = require("obsidian");

// src/i18n/ru.ts
var ru = {
  schema: {
    project: {
      label: "\u041F\u0440\u043E\u0435\u043A\u0442",
      labelPlural: "\u041F\u0440\u043E\u0435\u043A\u0442\u044B",
      fields: { summary: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
      links: {}
    },
    work: {
      label: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435",
      labelPlural: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F",
      fields: { format: "\u0424\u043E\u0440\u043C\u0430\u0442", type: "\u0422\u0438\u043F", status: "\u0421\u0442\u0430\u0442\u0443\u0441", summary: "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
      links: { project: "\u041F\u0440\u043E\u0435\u043A\u0442", books: "\u041A\u043D\u0438\u0433\u0438", arcs: "\u0410\u0440\u043A\u0438", anchors: "\u042F\u043A\u043E\u0440\u044F" }
    },
    book: {
      label: "\u041A\u043D\u0438\u0433\u0430",
      labelPlural: "\u041A\u043D\u0438\u0433\u0438",
      fields: {
        genre: "\u0416\u0430\u043D\u0440",
        format: "\u0424\u043E\u0440\u043C\u0430\u0442",
        audience: "\u0412\u043E\u0437\u0440\u0430\u0441\u0442\u043D\u0430\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F",
        idea: "\u0418\u0434\u0435\u044F",
        synopsis: "\u0421\u0438\u043D\u043E\u043F\u0441\u0438\u0441",
        completed: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E"
      },
      links: { work: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435", chapters: "\u0413\u043B\u0430\u0432\u044B" }
    },
    arc: {
      label: "\u0410\u0440\u043A\u0430",
      labelPlural: "\u0410\u0440\u043A\u0438",
      fields: { goal: "\u0426\u0435\u043B\u044C", description: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
      links: {
        work: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435",
        books: "\u041A\u043D\u0438\u0433\u0438",
        chapters: "\u0413\u043B\u0430\u0432\u044B",
        anchors: "\u042F\u043A\u043E\u0440\u044F",
        keyCharacters: "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438"
      }
    },
    anchor: {
      label: "\u042F\u043A\u043E\u0440\u044C",
      labelPlural: "\u042F\u043A\u043E\u0440\u044F",
      fields: {
        description: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F",
        date: "\u0414\u0430\u0442\u0430 / \u043C\u043E\u043C\u0435\u043D\u0442",
        order: "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u043D\u0430 \u0442\u0430\u0439\u043C\u043B\u0430\u0439\u043D\u0435"
      },
      links: { work: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435", arc: "\u0410\u0440\u043A\u0430", chapters: "\u0413\u043B\u0430\u0432\u044B", characters: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438" }
    },
    chapter: {
      label: "\u0413\u043B\u0430\u0432\u0430",
      labelPlural: "\u0413\u043B\u0430\u0432\u044B",
      fields: { status: "\u0421\u0442\u0430\u0442\u0443\u0441", synopsis: "\u0421\u0438\u043D\u043E\u043F\u0441\u0438\u0441" },
      links: { book: "\u041A\u043D\u0438\u0433\u0430", arc: "\u0410\u0440\u043A\u0430", anchors: "\u042F\u043A\u043E\u0440\u044F", characters: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438" }
    },
    page: {
      label: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
      labelPlural: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
      fields: { archived: "\u0410\u0440\u0445\u0438\u0432" },
      links: { chapter: "\u0413\u043B\u0430\u0432\u0430", characters: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438" }
    },
    character: {
      label: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436",
      labelPlural: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",
      fields: {
        // Основное
        type: "\u0422\u0438\u043F",
        role: "\u0420\u043E\u043B\u044C \u0432 \u0438\u0441\u0442\u043E\u0440\u0438\u0438",
        age: "\u0412\u043E\u0437\u0440\u0430\u0441\u0442",
        activity: "\u0414\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
        summary: "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
        // Характеристики → История
        storyGoalExternal: "\u0412\u043D\u0435\u0448\u043D\u044F\u044F \u0446\u0435\u043B\u044C",
        storyGoalInternal: "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u0446\u0435\u043B\u044C",
        initialBeliefs: "\u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u0443\u0431\u0435\u0436\u0434\u0435\u043D\u0438\u044F",
        changedBeliefs: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0435 \u0443\u0431\u0435\u0436\u0434\u0435\u043D\u0438\u044F",
        changeDriver: "\u0427\u0442\u043E \u043F\u0440\u0438\u0432\u043E\u0434\u0438\u0442 \u043A \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F\u043C",
        firstAppearance: "\u041F\u0435\u0440\u0432\u043E\u0435 \u043F\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u0435",
        plotInvolvement: "\u0412\u043E\u0432\u043B\u0435\u0447\u0451\u043D\u043D\u043E\u0441\u0442\u044C \u0432 \u0441\u044E\u0436\u0435\u0442",
        conflict: "\u041A\u043E\u043D\u0444\u043B\u0438\u043A\u0442",
        decisiveMoment: "\u0420\u0435\u0448\u0430\u044E\u0449\u0438\u0439 \u043C\u043E\u043C\u0435\u043D\u0442",
        // Характеристики → Жизнь
        skills: "\u041D\u0430\u0432\u044B\u043A\u0438",
        skillsOrigin: "\u041A\u0430\u043A \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u044B \u043D\u0430\u0432\u044B\u043A\u0438",
        strengthTalent: "\u0421\u0438\u043B\u0430/\u0442\u0430\u043B\u0430\u043D\u0442",
        weakness: "\u0421\u043B\u0430\u0431\u043E\u0441\u0442\u044C",
        hobbies: "\u0423\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F",
        habits: "\u041F\u0440\u0438\u0432\u044B\u0447\u043A\u0438",
        health: "\u0417\u0434\u043E\u0440\u043E\u0432\u044C\u0435",
        speech: "\u0420\u0435\u0447\u044C",
        pet: "\u0414\u043E\u043C\u0430\u0448\u043D\u0435\u0435 \u0436\u0438\u0432\u043E\u0442\u043D\u043E\u0435",
        specialItems: "\u041E\u0441\u043E\u0431\u044B\u0435 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u044B/\u043E\u0440\u0443\u0436\u0438\u0435/\u043F\u0440\u0438\u0441\u043F\u043E\u0441\u043E\u0431\u043B\u0435\u043D\u0438\u044F",
        residence: "\u041C\u0435\u0441\u0442\u043E \u043F\u0440\u043E\u0436\u0438\u0432\u0430\u043D\u0438\u044F/\u0441\u0440\u0435\u0434\u0430",
        homeDescription: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u043E\u043C\u0430",
        neighbors: "\u0421\u043E\u0441\u0435\u0434\u0438",
        organizations: "\u0423\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F\u0445",
        income: "\u0414\u043E\u0445\u043E\u0434",
        occupation: "\u0420\u0430\u0431\u043E\u0442\u0430/\u0440\u043E\u0434 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438",
        jobTitle: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C",
        jobSatisfaction: "\u0423\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0451\u043D\u043D\u043E\u0441\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u043E\u0439",
        // Характеристики → Мироощущение
        personalityTraits: "\u0427\u0435\u0440\u0442\u044B \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0430",
        moralValues: "\u041C\u043E\u0440\u0430\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438",
        drivingForce: "\u0414\u0432\u0438\u0436\u0443\u0449\u0430\u044F \u0441\u0438\u043B\u0430",
        discouragement: "\u0427\u0442\u043E \u043F\u0440\u0438\u0432\u043E\u0434\u0438\u0442 \u043A \u0443\u043F\u0430\u0434\u043A\u0443 \u0434\u0443\u0445\u0430",
        philosophicalViews: "\u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0441\u043A\u0438\u0435 \u0432\u0437\u0433\u043B\u044F\u0434\u044B",
        biggestFear: "\u0421\u0430\u043C\u044B\u0439 \u0441\u0438\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0440\u0430\u0445",
        selfControl: "\u0421\u0430\u043C\u043E\u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C",
        intelligenceLevel: "\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0430",
        confidenceLevel: "\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0443\u0432\u0435\u0440\u0435\u043D\u043D\u043E\u0441\u0442\u0438",
        // Биография
        childhood: "\u0414\u0435\u0442\u0441\u0442\u0432\u043E",
        importantPastEvent: "\u0412\u0430\u0436\u043D\u043E\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u0435 \u0438\u0437 \u043F\u0440\u043E\u0448\u043B\u043E\u0433\u043E",
        bestAchievement: "\u041B\u0443\u0447\u0448\u0435\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435",
        otherAchievements: "\u0414\u0440\u0443\u0433\u0438\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F",
        worstMoment: "\u0425\u0443\u0434\u0448\u0438\u0439 \u043C\u043E\u043C\u0435\u043D\u0442",
        failures: "\u041D\u0435\u0443\u0434\u0430\u0447\u0438",
        secrets: "\u0421\u0435\u043A\u0440\u0435\u0442\u044B",
        bestMemories: "\u041B\u0443\u0447\u0448\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F",
        worstMemories: "\u0425\u0443\u0434\u0448\u0438\u0435 \u0432\u043E\u0441\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F",
        // Внешность
        height: "\u0420\u043E\u0441\u0442",
        weight: "\u0412\u0435\u0441",
        build: "\u0422\u0435\u043B\u043E\u0441\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
        skinColor: "\u0426\u0432\u0435\u0442 \u043A\u043E\u0436\u0438",
        hairstyle: "\u041F\u0440\u0438\u0447\u0451\u0441\u043A\u0430",
        hairColor: "\u0426\u0432\u0435\u0442 \u0432\u043E\u043B\u043E\u0441",
        eyeShape: "\u0424\u043E\u0440\u043C\u0430 \u0433\u043B\u0430\u0437",
        eyeColor: "\u0426\u0432\u0435\u0442 \u0433\u043B\u0430\u0437",
        faceShape: "\u0424\u043E\u0440\u043C\u0430 \u043B\u0438\u0446\u0430",
        distinctiveFeatures: "\u041E\u0442\u043B\u0438\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0447\u0435\u0440\u0442\u044B \u0432\u043D\u0435\u0448\u043D\u043E\u0441\u0442\u0438",
        otherFaceFeatures: "\u041F\u0440\u043E\u0447\u0438\u0435 \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043B\u0438\u0446\u0430",
        posture: "\u041E\u0441\u0430\u043D\u043A\u0430",
        otherAppearance: "\u041F\u0440\u043E\u0447\u0438\u0435 \u043E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0432\u043D\u0435\u0448\u043D\u043E\u0441\u0442\u0438",
        ethnicity: "\u042D\u0442\u043D\u043E\u0441/\u0420\u0430\u0441\u0430",
        clothing: "\u041E\u0434\u0435\u0436\u0434\u0430",
        accessories: "\u0410\u043A\u0441\u0435\u0441\u0441\u0443\u0430\u0440\u044B"
      },
      links: {
        project: "\u041F\u0440\u043E\u0435\u043A\u0442",
        works: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F",
        affiliation: "\u041F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u043D\u043E\u0441\u0442\u044C",
        arcs: "\u0410\u0440\u043A\u0438"
      }
    },
    category: {
      label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
      labelPlural: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
      fields: { summary: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" },
      links: { project: "\u041F\u0440\u043E\u0435\u043A\u0442" }
    },
    categoryItem: {
      label: "\u042D\u043B\u0435\u043C\u0435\u043D\u0442",
      labelPlural: "\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
      fields: {},
      links: { works: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F" }
    },
    preset: {
      organization: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F",
      location: "\u041B\u043E\u043A\u0430\u0446\u0438\u044F",
      language: "\u042F\u0437\u044B\u043A",
      custom: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0430\u044F"
    },
    categoryPreset: {
      organization: {
        type: "\u0422\u0438\u043F",
        summary: "\u041A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
        linkDefs: { leader: "\u041B\u0438\u0434\u0435\u0440", members: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438" }
      },
      location: {
        type: "\u0422\u0438\u043F",
        country: "\u0421\u0442\u0440\u0430\u043D\u0430",
        summary: "\u041A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
        linkDefs: {}
      },
      language: {
        type: "\u0422\u0438\u043F",
        region: "\u0420\u0435\u0433\u0438\u043E\u043D",
        summary: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
        linkDefs: {}
      },
      custom: {
        summary: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
        linkDefs: {}
      }
    }
  },
  nav: {
    search: "\u041F\u043E\u0438\u0441\u043A\u2026",
    works: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F",
    characters: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",
    noWorks: "\u041D\u0435\u0442 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0439",
    nothingFound: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
    noItems: "\u041D\u0435\u0442 {{label}}. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 + \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C.",
    openSettings: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 Scenarist",
    noProject: "\u2014 \u0411\u0435\u0437 \u043F\u0440\u043E\u0435\u043A\u0442\u0430",
    createProject: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
    newProject: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442",
    timeline: "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D",
    add: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
    openCard: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443",
    openNote: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443",
    delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
    deleted: "\u0423\u0434\u0430\u043B\u0435\u043D\u043E: {{name}}",
    createWork: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435",
    createCharacter: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430",
    createFor: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C: {{label}}",
    newWork: "\u041D\u043E\u0432\u044B\u0439: {{name}}",
    newChapter: "\u041D\u043E\u0432\u0430\u044F \u0433\u043B\u0430\u0432\u0430",
    newArc: "\u041D\u043E\u0432\u0430\u044F \u0430\u0440\u043A\u0430",
    newAnchor: "\u041D\u043E\u0432\u044B\u0439 \u044F\u043A\u043E\u0440\u044C",
    arcs: "\u0410\u0440\u043A\u0438",
    anchors: "\u042F\u043A\u043E\u0440\u044F",
    book: "\u041A\u043D\u0438\u0433\u0430",
    arc: "\u0410\u0440\u043A\u0430",
    anchor: "\u042F\u043A\u043E\u0440\u044C",
    noRole: "\u0411\u0435\u0437 \u0440\u043E\u043B\u0438"
  },
  card: {
    empty: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0432 \u043D\u0430\u0432\u0438\u0433\u0430\u0442\u043E\u0440\u0435",
    emptyHint: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435, \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 \u0438\u043B\u0438 \u0433\u043B\u0430\u0432\u0443 \u0441\u043B\u0435\u0432\u0430",
    back: "\u041D\u0430\u0437\u0430\u0434",
    openNote: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443",
    noteLabel: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430",
    noName: "\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",
    tab: {
      basic: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0435",
      characteristics: "\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438",
      biography: "\u0411\u0438\u043E\u0433\u0440\u0430\u0444\u0438\u044F",
      appearance: "\u0412\u043D\u0435\u0448\u043D\u043E\u0441\u0442\u044C"
    },
    section: {
      story: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F",
      life: "\u0416\u0438\u0437\u043D\u044C",
      worldview: "\u041C\u0438\u0440\u043E\u043E\u0449\u0443\u0449\u0435\u043D\u0438\u0435"
    },
    avatar: {
      set: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u043E\u0442\u043E",
      tooltip: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E",
      remove: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u0432\u0430\u0442\u0430\u0440"
    },
    gallery: {
      title: "\u0420\u0435\u0444\u0435\u0440\u0435\u043D\u0441\u044B \u0438 \u043D\u0430\u0431\u0440\u043E\u0441\u043A\u0438",
      add: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
      empty: "\u041D\u0435\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439",
      references: "\u0420\u0435\u0444\u0435\u0440\u0435\u043D\u0441\u044B",
      sketches: "\u041D\u0430\u0431\u0440\u043E\u0441\u043A\u0438"
    },
    addTag: "+ \u0442\u0435\u0433",
    tagPlaceholder: "\u0442\u0435\u0433\u2026",
    removeTag: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u0435\u0433",
    findTag: "\u041D\u0430\u0439\u0442\u0438 #{{tag}} \u0432 vault",
    addLink: "+ \u0441\u0441\u044B\u043B\u043A\u0430",
    linkPlaceholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438\u2026",
    openLink: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C: {{link}}",
    noteLinks: "\u0421\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
    relations: "\u0421\u0432\u044F\u0437\u0438",
    text: "\u0422\u0435\u043A\u0441\u0442",
    edit: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
    emptyBody: "\u041F\u0443\u0441\u0442\u043E.",
    noteNotCreated: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u0435\u0449\u0451 \u043D\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0430 \u2014 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C\xBB.",
    addGenre: "\uFF0B \u0436\u0430\u043D\u0440\u2026",
    addNewGenre: "\uFF0B \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0432\u043E\u0439\u2026",
    newGenrePlaceholder: "\u041D\u043E\u0432\u044B\u0439 \u0436\u0430\u043D\u0440\u2026",
    addRelation: "+ \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C\u2026",
    items: "\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u044B ({{count}})",
    addItem: "\uFF0B \u044D\u043B\u0435\u043C\u0435\u043D\u0442",
    emptyItems: "\u041F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u043E.",
    backlinks: {
      chapters: "\u041F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u0433\u043B\u0430\u0432\u0430\u0445",
      pages: "\u041F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0445",
      members: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438",
      arcs: "\u0410\u0440\u043A\u0438",
      books: "\u041A\u043D\u0438\u0433\u0438",
      anchors: "\u042F\u043A\u043E\u0440\u044F",
      works: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F"
    }
  },
  modal: {
    cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
    create: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C",
    save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
    add: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
    name: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
    namePlaceholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u2026",
    newEntity: "\u041D\u043E\u0432\u044B\u0439: {{label}}",
    created: "\u0421\u043E\u0437\u0434\u0430\u043D\u043E: {{name}}",
    multipleHint: " (\u043C\u043E\u0436\u043D\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E)",
    newWork: "\u041D\u043E\u0432\u043E\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435",
    workFormat: "\u0424\u043E\u0440\u043C\u0430\u0442",
    workType: "\u0422\u0438\u043F",
    workName: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
    workNamePlaceholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F\u2026",
    series: "\u0421\u0435\u0440\u0438\u044F",
    oneshot: "\u0412\u0430\u043D\u0448\u043E\u0442",
    seriesDesc: "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u043D\u0438\u0433 (\u0442\u043E\u043C\u043E\u0432)",
    oneshotDesc: "\u041E\u0434\u043D\u0430 \u043A\u043D\u0438\u0433\u0430",
    story: "\u0420\u0430\u0441\u0441\u043A\u0430\u0437",
    script: "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439",
    workCreated: "\u0421\u043E\u0437\u0434\u0430\u043D\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435: {{name}}",
    newCategory: "\u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
    newCategoryPreset: "\u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F: {{preset}}",
    categoryType: "\u0422\u0438\u043F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
    categoryName: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
    categoryNamePlaceholder: "\u041D\u0430\u043F\u0440. \xAB{{preset}}\xBB\u2026",
    categoryNameGenericPlaceholder: "\u041D\u0430\u043F\u0440. \xAB\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438\xBB, \xAB\u041B\u043E\u043A\u0430\u0446\u0438\u0438\xBB\u2026",
    categoryCreated: "\u0421\u043E\u0437\u0434\u0430\u043D\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F: {{name}}",
    presets: {
      organization: "\u041F\u043E\u043B\u044F: \u0442\u0438\u043F, \u043B\u0438\u0434\u0435\u0440, \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438",
      location: "\u041F\u043E\u043B\u044F: \u0442\u0438\u043F, \u0441\u0442\u0440\u0430\u043D\u0430",
      language: "\u041F\u043E\u043B\u044F: \u0442\u0438\u043F, \u0440\u0435\u0433\u0438\u043E\u043D",
      custom: "\u041F\u0443\u0441\u0442\u0430\u044F, \u043F\u043E\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u0435 \u043F\u043E\u0437\u0436\u0435"
    },
    newCategoryType: "\u041D\u043E\u0432\u044B\u0439 \u0442\u0438\u043F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
    icon: "\u0418\u043A\u043E\u043D\u043A\u0430",
    typeName: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
    typeNamePlaceholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B",
    typeAdded: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0442\u0438\u043F: {{label}}",
    editType: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u0438\u043F"
  },
  settings: {
    title: "Scenarist \u2014 \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
    general: "\u041E\u0431\u0449\u0438\u0435",
    rootFolder: "\u041A\u043E\u0440\u043D\u0435\u0432\u0430\u044F \u043F\u0430\u043F\u043A\u0430",
    rootFolderDesc: "\u041F\u0430\u043F\u043A\u0430 \u0432 vault, \u0433\u0434\u0435 Scenarist \u0445\u0440\u0430\u043D\u0438\u0442 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
    autoCreate: "\u0410\u0432\u0442\u043E\u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043E\u043A",
    autoCreateDesc: "\u0421\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C .md-\u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u0441\u0443\u0449\u043D\u043E\u0441\u0442\u0438",
    quickTypes: "\u0411\u044B\u0441\u0442\u0440\u044B\u0435 \u0442\u0438\u043F\u044B \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439",
    quickTypesDesc: "\u041A\u043D\u043E\u043F\u043A\u0438-\u0432\u043A\u043B\u0430\u0434\u043A\u0438 \u0432 \u043D\u0430\u0432\u0438\u0433\u0430\u0442\u043E\u0440\u0435. \u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u0435 \u0438\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0441\u0432\u043E\u0439 \u0442\u0438\u043F.",
    addCustomType: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0442\u0438\u043F",
    addCustomTypeDesc: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043A\u043E\u043D\u043A\u0443 \u0438 \u0437\u0430\u0434\u0430\u0439\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
    addCustomTypeBtn: "\uFF0B \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
    editTooltip: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
    deleteTooltip: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"
  },
  commands: {
    openScenarist: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C Scenarist",
    openInScenarist: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432 Scenarist",
    openBoard: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u043E\u0441\u043A\u0443 \u0433\u043B\u0430\u0432",
    openGraph: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0433\u0440\u0430\u0444 \u0441\u0432\u044F\u0437\u0435\u0439",
    newProject: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442",
    newWork: "\u041D\u043E\u0432\u043E\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435 (\u0421\u0435\u0440\u0438\u044F/\u0412\u0430\u043D\u0448\u043E\u0442)",
    newCharacter: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436",
    newCategory: "\u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
    rescanVault: "\u041F\u0435\u0440\u0435\u0441\u043A\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C vault (\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0443\u0442\u0438 \u0444\u0430\u0439\u043B\u043E\u0432)",
    ribbon: "Scenarist"
  },
  board: {
    title: "\u0414\u043E\u0441\u043A\u0430 \u0433\u043B\u0430\u0432",
    empty: "\u041D\u0435\u0442 \u0433\u043B\u0430\u0432 \u0432 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u043C \u043F\u0440\u043E\u0435\u043A\u0442\u0435",
    noStatus: "\u0411\u0435\u0437 \u0441\u0442\u0430\u0442\u0443\u0441\u0430"
  },
  graph: {
    empty: "\u041D\u0435\u0442 \u0441\u0443\u0449\u043D\u043E\u0441\u0442\u0435\u0439 \u0434\u043B\u044F \u0433\u0440\u0430\u0444\u0430 \u0432 \u044D\u0442\u043E\u043C \u043F\u0440\u043E\u0435\u043A\u0442\u0435",
    legend: {
      work: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F",
      character: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",
      categoryItem: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
      arc: "\u0410\u0440\u043A\u0438",
      anchor: "\u042F\u043A\u043E\u0440\u044F"
    }
  },
  timeline: {
    title: "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D",
    titleWork: "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D \u2014 {{name}}",
    noWork: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0442\u0430\u0439\u043C\u043B\u0430\u0439\u043D \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0438\u0437 \u043D\u0430\u0432\u0438\u0433\u0430\u0442\u043E\u0440\u0430",
    noAnchors: "\u041D\u0435\u0442 \u044F\u043A\u043E\u0440\u0435\u0439. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F \u0447\u0435\u0440\u0435\u0437 \xAB\uFF0B\xBB \u0443 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F."
  }
};

// src/i18n/en.ts
var en = {
  schema: {
    project: {
      label: "Project",
      labelPlural: "Projects",
      fields: { summary: "Description" },
      links: {}
    },
    work: {
      label: "Work",
      labelPlural: "Works",
      fields: { format: "Format", type: "Type", status: "Status", summary: "Short description" },
      links: { project: "Project", books: "Books", arcs: "Arcs", anchors: "Anchors" }
    },
    book: {
      label: "Book",
      labelPlural: "Books",
      fields: {
        genre: "Genre",
        format: "Format",
        audience: "Target audience (age)",
        idea: "Idea",
        synopsis: "Synopsis",
        completed: "Completed"
      },
      links: { work: "Work", chapters: "Chapters" }
    },
    arc: {
      label: "Arc",
      labelPlural: "Arcs",
      fields: { goal: "Goal", description: "Description" },
      links: {
        work: "Work",
        books: "Books",
        chapters: "Chapters",
        anchors: "Anchors",
        keyCharacters: "Key characters"
      }
    },
    anchor: {
      label: "Anchor",
      labelPlural: "Anchors",
      fields: {
        description: "Event description",
        date: "Date / moment",
        order: "Timeline order"
      },
      links: { work: "Work", arc: "Arc", chapters: "Chapters", characters: "Characters" }
    },
    chapter: {
      label: "Chapter",
      labelPlural: "Chapters",
      fields: { status: "Status", synopsis: "Synopsis" },
      links: { book: "Book", arc: "Arc", anchors: "Anchors", characters: "Characters" }
    },
    page: {
      label: "Page",
      labelPlural: "Pages",
      fields: { archived: "Archive" },
      links: { chapter: "Chapter", characters: "Characters" }
    },
    character: {
      label: "Character",
      labelPlural: "Characters",
      fields: {
        // Basic
        type: "Type",
        role: "Story role",
        age: "Age",
        activity: "Occupation",
        summary: "Short description",
        // Characteristics → Story
        storyGoalExternal: "External goal",
        storyGoalInternal: "Internal goal",
        initialBeliefs: "Initial beliefs",
        changedBeliefs: "Changed beliefs",
        changeDriver: "What drives the change",
        firstAppearance: "First appearance",
        plotInvolvement: "Plot involvement",
        conflict: "Conflict",
        decisiveMoment: "Decisive moment",
        // Characteristics → Life
        skills: "Skills",
        skillsOrigin: "How skills were acquired",
        strengthTalent: "Strength / talent",
        weakness: "Weakness",
        hobbies: "Hobbies",
        habits: "Habits",
        health: "Health",
        speech: "Speech",
        pet: "Pet",
        specialItems: "Special interests / weapons / tools",
        residence: "Residence / environment",
        homeDescription: "Home description",
        neighbors: "Neighbours",
        organizations: "Organization memberships",
        income: "Income",
        occupation: "Occupation / work",
        jobTitle: "Job title",
        jobSatisfaction: "Job satisfaction",
        // Characteristics → Worldview
        personalityTraits: "Personality traits",
        moralValues: "Moral values",
        drivingForce: "Driving force",
        discouragement: "What discourages them",
        philosophicalViews: "Philosophical views",
        biggestFear: "Biggest fear",
        selfControl: "Self-control",
        intelligenceLevel: "Intelligence level",
        confidenceLevel: "Confidence level",
        // Biography
        childhood: "Childhood",
        importantPastEvent: "Important past event",
        bestAchievement: "Best achievement",
        otherAchievements: "Other achievements",
        worstMoment: "Worst moment",
        failures: "Failures",
        secrets: "Secrets",
        bestMemories: "Best memories",
        worstMemories: "Worst memories",
        // Appearance
        height: "Height",
        weight: "Weight",
        build: "Build",
        skinColor: "Skin colour",
        hairstyle: "Hairstyle",
        hairColor: "Hair colour",
        eyeShape: "Eye shape",
        eyeColor: "Eye colour",
        faceShape: "Face shape",
        distinctiveFeatures: "Distinctive appearance features",
        otherFaceFeatures: "Other facial features",
        posture: "Posture",
        otherAppearance: "Other appearance details",
        ethnicity: "Ethnicity / Race",
        clothing: "Clothing",
        accessories: "Accessories"
      },
      links: {
        project: "Project",
        works: "Works",
        affiliation: "Affiliation",
        arcs: "Arcs"
      }
    },
    category: {
      label: "Category",
      labelPlural: "Categories",
      fields: { summary: "Category description" },
      links: { project: "Project" }
    },
    categoryItem: {
      label: "Item",
      labelPlural: "Items",
      fields: {},
      links: { works: "Works" }
    },
    preset: {
      organization: "Organization",
      location: "Location",
      language: "Language",
      custom: "Custom"
    },
    categoryPreset: {
      organization: {
        type: "Type",
        summary: "Short description",
        linkDefs: { leader: "Leader", members: "Members" }
      },
      location: {
        type: "Type",
        country: "Country",
        summary: "Short description",
        linkDefs: {}
      },
      language: {
        type: "Type",
        region: "Region",
        summary: "Description",
        linkDefs: {}
      },
      custom: {
        summary: "Description",
        linkDefs: {}
      }
    }
  },
  nav: {
    search: "Search\u2026",
    works: "Works",
    characters: "Characters",
    noWorks: "No works yet",
    nothingFound: "Nothing found",
    noItems: "No {{label}}. Click + to create.",
    openSettings: "Scenarist settings",
    noProject: "\u2014 No project",
    createProject: "Create project",
    newProject: "New project",
    timeline: "Timeline",
    add: "Add",
    openCard: "Open card",
    openNote: "Open note",
    delete: "Delete",
    deleted: "Deleted: {{name}}",
    createWork: "Create work",
    createCharacter: "Create character",
    createFor: "Create: {{label}}",
    newWork: "New: {{name}}",
    newChapter: "New chapter",
    newArc: "New arc",
    newAnchor: "New anchor",
    arcs: "Arcs",
    anchors: "Anchors",
    book: "Book",
    arc: "Arc",
    anchor: "Anchor",
    noRole: "No role"
  },
  card: {
    empty: "Select an item in the navigator",
    emptyHint: "Click on a work, character or chapter on the left",
    back: "Back",
    openNote: "Open note",
    noteLabel: "Note",
    noName: "Untitled",
    tab: {
      basic: "Basic",
      characteristics: "Characteristics",
      biography: "Biography",
      appearance: "Appearance"
    },
    section: {
      story: "Story",
      life: "Life",
      worldview: "Worldview"
    },
    avatar: {
      set: "Add photo",
      tooltip: "Click to upload a photo",
      remove: "Remove avatar"
    },
    gallery: {
      title: "References & sketches",
      add: "Add",
      empty: "No images yet",
      references: "References",
      sketches: "Sketches"
    },
    addTag: "+ tag",
    tagPlaceholder: "tag\u2026",
    removeTag: "Remove tag",
    findTag: "Find #{{tag}} in vault",
    addLink: "+ link",
    linkPlaceholder: "Note name\u2026",
    openLink: "Open: {{link}}",
    noteLinks: "Note links",
    relations: "Relations",
    text: "Text",
    edit: "Edit",
    emptyBody: "Empty.",
    noteNotCreated: "Note not created yet \u2014 click \xABEdit\xBB.",
    addGenre: "\uFF0B genre\u2026",
    addNewGenre: "\uFF0B Add custom\u2026",
    newGenrePlaceholder: "New genre\u2026",
    addRelation: "+ add\u2026",
    items: "Items ({{count}})",
    addItem: "\uFF0B item",
    emptyItems: "Nothing yet.",
    backlinks: {
      chapters: "Appears in chapters",
      pages: "Appears in pages",
      members: "Members",
      arcs: "Arcs",
      books: "Books",
      anchors: "Anchors",
      works: "Works"
    }
  },
  modal: {
    cancel: "Cancel",
    create: "Create",
    save: "Save",
    add: "Add",
    name: "Name",
    namePlaceholder: "Enter name\u2026",
    newEntity: "New: {{label}}",
    created: "Created: {{name}}",
    multipleHint: " (multiple allowed)",
    newWork: "New work",
    workFormat: "Format",
    workType: "Type",
    workName: "Name",
    workNamePlaceholder: "Work title\u2026",
    series: "Series",
    oneshot: "One-shot",
    seriesDesc: "Multiple books (volumes)",
    oneshotDesc: "Single book",
    story: "Story",
    script: "Script",
    workCreated: "Work created: {{name}}",
    newCategory: "New category",
    newCategoryPreset: "New category: {{preset}}",
    categoryType: "Category type",
    categoryName: "Category name",
    categoryNamePlaceholder: "E.g. \xAB{{preset}}\xBB\u2026",
    categoryNameGenericPlaceholder: "E.g. \xABOrganizations\xBB, \xABLocations\xBB\u2026",
    categoryCreated: "Category created: {{name}}",
    presets: {
      organization: "Fields: type, leader, members",
      location: "Fields: type, country",
      language: "Fields: type, region",
      custom: "Empty, add fields later"
    },
    newCategoryType: "New category type",
    icon: "Icon",
    typeName: "Name",
    typeNamePlaceholder: "E.g.: Artifacts",
    typeAdded: "Type added: {{label}}",
    editType: "Edit type"
  },
  settings: {
    title: "Scenarist \u2014 Settings",
    general: "General",
    rootFolder: "Root folder",
    rootFolderDesc: "Folder in vault where Scenarist stores notes",
    autoCreate: "Auto-create notes",
    autoCreateDesc: "Create a .md note when adding an entity",
    quickTypes: "Quick category types",
    quickTypesDesc: "Tab buttons in the navigator. Enable the ones you need or add a custom type.",
    addCustomType: "Add custom type",
    addCustomTypeDesc: "Choose an icon and set a name",
    addCustomTypeBtn: "\uFF0B Add",
    editTooltip: "Edit",
    deleteTooltip: "Delete"
  },
  commands: {
    openScenarist: "Open Scenarist",
    openInScenarist: "Open in Scenarist",
    openBoard: "Open chapter board",
    openGraph: "Open relations graph",
    newProject: "New project",
    newWork: "New work (Series/One-shot)",
    newCharacter: "New character",
    newCategory: "New category",
    rescanVault: "Rescan vault (update file paths)",
    ribbon: "Scenarist"
  },
  board: {
    title: "Chapter board",
    empty: "No chapters in the active project",
    noStatus: "No status"
  },
  graph: {
    empty: "No entities for graph in this project",
    legend: {
      work: "Works",
      character: "Characters",
      categoryItem: "Categories",
      arc: "Arcs",
      anchor: "Anchors"
    }
  },
  timeline: {
    title: "Timeline",
    titleWork: "Timeline \u2014 {{name}}",
    noWork: "Open a work timeline from the navigator",
    noAnchors: "No anchors. Add key events via \xAB\uFF0B\xBB in the navigator."
  }
};

// src/i18n/index.ts
var LOCALES = { ru, en };
var translations = ru;
var currentLang = "ru";
function detectLang() {
  var _a, _b, _c, _d;
  const locale = (_c = (_b = (_a = window.moment) == null ? void 0 : _a.locale) == null ? void 0 : _b.call(_a)) != null ? _c : "en";
  return (_d = Object.keys(LOCALES).find((l) => locale.startsWith(l))) != null ? _d : "en";
}
function setLocale(lang) {
  var _a;
  translations = (_a = LOCALES[lang]) != null ? _a : ru;
  currentLang = LOCALES[lang] ? lang : "ru";
}
function t(key, vars, fallback) {
  const parts = key.split(".");
  let node = translations;
  for (const p of parts) {
    if (node === null || node === void 0 || typeof node !== "object")
      return fallback != null ? fallback : key;
    node = node[p];
  }
  if (typeof node !== "string")
    return fallback != null ? fallback : key;
  if (vars === void 0)
    return node;
  return node.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    var _a;
    return String((_a = vars[k]) != null ? _a : k);
  });
}

// src/settings.ts
var DEFAULT_QUICK_TYPES = [
  { id: "org", label: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438", icon: "building-2", preset: "organization", enabled: true, isDefault: true },
  { id: "loc", label: "\u041B\u043E\u043A\u0430\u0446\u0438\u0438", icon: "map-pin", preset: "location", enabled: true, isDefault: true },
  { id: "lang", label: "\u042F\u0437\u044B\u043A\u0438", icon: "languages", preset: "language", enabled: false, isDefault: true }
];
var DEFAULT_GENRE_OPTIONS = [
  "\u041F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
  "\u041A\u043E\u043C\u0435\u0434\u0438\u044F",
  "\u0422\u0440\u0438\u043B\u043B\u0435\u0440",
  "\u0414\u0440\u0430\u043C\u0430",
  "\u0424\u044D\u043D\u0442\u0435\u0437\u0438",
  "\u041D\u0430\u0443\u0447\u043D\u0430\u044F \u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430",
  "\u0425\u043E\u0440\u0440\u043E\u0440",
  "\u0420\u043E\u043C\u0430\u043D\u0442\u0438\u043A\u0430",
  "\u0414\u0435\u0442\u0435\u043A\u0442\u0438\u0432",
  "\u0411\u043E\u0435\u0432\u0438\u043A"
];
var DEFAULT_SETTINGS = {
  rootFolder: "Scenarist",
  autoCreateNotes: true,
  categoryQuickTypes: DEFAULT_QUICK_TYPES.map((qt) => ({ ...qt })),
  genreOptions: [...DEFAULT_GENRE_OPTIONS]
};
var ScenaristSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: t("settings.title") });
    containerEl.createEl("h3", { text: t("settings.general") });
    new import_obsidian.Setting(containerEl).setName(t("settings.rootFolder")).setDesc(t("settings.rootFolderDesc")).addText(
      (text) => text.setPlaceholder("Scenarist").setValue(this.plugin.settings.rootFolder).onChange(async (value) => {
        this.plugin.settings.rootFolder = value.trim() || "Scenarist";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(t("settings.autoCreate")).setDesc(t("settings.autoCreateDesc")).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoCreateNotes).onChange(async (value) => {
        this.plugin.settings.autoCreateNotes = value;
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h3", { text: t("settings.quickTypes") });
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: t("settings.quickTypesDesc")
    });
    this.renderQuickTypes(containerEl);
  }
  renderQuickTypes(containerEl) {
    for (const qt of this.plugin.settings.categoryQuickTypes) {
      const s = new import_obsidian.Setting(containerEl).setName(qt.label).addToggle(
        (toggle) => toggle.setValue(qt.enabled).onChange(async (val) => {
          qt.enabled = val;
          await this.plugin.saveSettings();
        })
      );
      const iconEl = document.createElement("span");
      iconEl.classList.add("scenarist-setting-icon");
      if ([...qt.icon].length <= 2) {
        iconEl.textContent = qt.icon;
      } else {
        (0, import_obsidian.setIcon)(iconEl, qt.icon);
      }
      s.nameEl.prepend(iconEl);
      if (!qt.isDefault) {
        s.addButton(
          (btn) => btn.setIcon("pencil").setTooltip(t("settings.editTooltip")).onClick(() => {
            new EditQuickTypeModal(this.app, qt.icon, qt.label, async (newIcon, newLabel) => {
              qt.icon = newIcon;
              qt.label = newLabel;
              await this.plugin.saveSettings();
              this.display();
            }).open();
          })
        );
        s.addButton(
          (btn) => btn.setIcon("trash").setTooltip(t("settings.deleteTooltip")).setWarning().onClick(async () => {
            this.plugin.settings.categoryQuickTypes = this.plugin.settings.categoryQuickTypes.filter(
              (qt2) => qt2.id !== qt.id
            );
            await this.plugin.saveSettings();
            this.display();
          })
        );
      }
    }
    new import_obsidian.Setting(containerEl).setName(t("settings.addCustomType")).setDesc(t("settings.addCustomTypeDesc")).addButton(
      (btn) => btn.setButtonText(t("settings.addCustomTypeBtn")).setCta().onClick(() => new AddQuickTypeModal(this.app, this.plugin, () => this.display()).open())
    );
  }
};
var LUCIDE_PICKER_ICONS = [
  // Люди / роли
  "user",
  "users",
  "user-check",
  "user-cog",
  "crown",
  "shield",
  // Власть / организации
  "building-2",
  "landmark",
  "flag",
  "swords",
  "handshake",
  "network",
  // Места / мир
  "map-pin",
  "map",
  "compass",
  "globe",
  "mountain",
  "home",
  // Природа / стихии
  "trees",
  "flame",
  "droplets",
  "zap",
  "wind",
  "cloud",
  // Документы / знания
  "book-open",
  "scroll",
  "pen-line",
  "feather",
  "brain",
  "graduation-cap",
  // Структуры / связи
  "git-branch",
  "layers",
  "shapes",
  "tag",
  "anchor",
  "link",
  // Предметы
  "gem",
  "key",
  "lock",
  "star",
  "heart",
  "target",
  // Время / прочее
  "hourglass",
  "clock",
  "moon",
  "sun",
  "infinity",
  "eye"
];
var AddQuickTypeModal = class extends import_obsidian.Modal {
  constructor(app, plugin, onDone) {
    super(app);
    this.selectedIcon = "shapes";
    this.plugin = plugin;
    this.onDone = onDone;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("scenarist-modal");
    contentEl.createEl("h2", { text: t("modal.newCategoryType"), cls: "scenarist-modal-title" });
    const iconRow = contentEl.createDiv("scenarist-form-row");
    iconRow.createEl("label", { text: t("modal.icon"), cls: "scenarist-label" });
    const pickerWrap = iconRow.createDiv("scenarist-icon-picker");
    const preview = pickerWrap.createDiv("scenarist-icon-preview");
    (0, import_obsidian.setIcon)(preview, this.selectedIcon);
    const grid = pickerWrap.createDiv("scenarist-icon-grid");
    for (const iconName of LUCIDE_PICKER_ICONS) {
      const cell = grid.createEl("button", {
        cls: `scenarist-icon-cell${iconName === this.selectedIcon ? " selected" : ""}`,
        attr: { type: "button", title: iconName }
      });
      (0, import_obsidian.setIcon)(cell, iconName);
      cell.onclick = () => {
        this.selectedIcon = iconName;
        preview.empty();
        (0, import_obsidian.setIcon)(preview, iconName);
        grid.querySelectorAll(".scenarist-icon-cell").forEach((b) => b.removeClass("selected"));
        cell.addClass("selected");
      };
    }
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: t("modal.typeName"), cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: t("modal.typeNamePlaceholder")
    });
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: t("modal.cancel") }).onclick = () => this.close();
    const createBtn = btns.createEl("button", { cls: "scenarist-btn-primary", text: t("modal.add") });
    createBtn.onclick = async () => {
      const label = nameInput.value.trim();
      if (!label) {
        nameInput.addClass("error");
        return;
      }
      this.plugin.settings.categoryQuickTypes.push({
        id: "custom_" + Date.now(),
        label,
        icon: this.selectedIcon,
        preset: "custom",
        enabled: true,
        isDefault: false
      });
      await this.plugin.saveSettings();
      new import_obsidian.Notice(t("modal.typeAdded", { label }));
      this.close();
      this.onDone();
    };
    nameInput.focus();
  }
  onClose() {
    this.contentEl.empty();
  }
};
var EditQuickTypeModal = class extends import_obsidian.Modal {
  constructor(app, currentIcon, currentLabel, onSave) {
    super(app);
    this.currentIcon = currentIcon;
    this.currentLabel = currentLabel;
    this.selectedIcon = [...currentIcon].length <= 2 ? "shapes" : currentIcon;
    this.onSave = onSave;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("scenarist-modal");
    contentEl.createEl("h2", { text: t("modal.editType"), cls: "scenarist-modal-title" });
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: t("modal.typeName"), cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: t("modal.typeNamePlaceholder")
    });
    nameInput.value = this.currentLabel;
    const iconRow = contentEl.createDiv("scenarist-form-row");
    iconRow.createEl("label", { text: t("modal.icon"), cls: "scenarist-label" });
    const pickerWrap = iconRow.createDiv("scenarist-icon-picker");
    const preview = pickerWrap.createDiv("scenarist-icon-preview");
    (0, import_obsidian.setIcon)(preview, this.selectedIcon);
    const grid = pickerWrap.createDiv("scenarist-icon-grid");
    for (const iconName of LUCIDE_PICKER_ICONS) {
      const cell = grid.createEl("button", {
        cls: `scenarist-icon-cell${iconName === this.selectedIcon ? " selected" : ""}`,
        attr: { type: "button", title: iconName }
      });
      (0, import_obsidian.setIcon)(cell, iconName);
      cell.onclick = () => {
        this.selectedIcon = iconName;
        preview.empty();
        (0, import_obsidian.setIcon)(preview, iconName);
        grid.querySelectorAll(".scenarist-icon-cell").forEach((b) => b.removeClass("selected"));
        cell.addClass("selected");
      };
    }
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: t("modal.cancel") }).onclick = () => this.close();
    const saveBtn = btns.createEl("button", { cls: "scenarist-btn-primary", text: t("modal.save") });
    saveBtn.onclick = () => {
      const label = nameInput.value.trim();
      if (!label) {
        nameInput.addClass("error");
        return;
      }
      this.onSave(this.selectedIcon, label);
      this.close();
    };
    nameInput.focus();
  }
  onClose() {
    this.contentEl.empty();
  }
};

// node_modules/nanoid/index.browser.js
var nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");

// src/models/types.ts
var INDEX_VERSION = 2;
var NO_PROJECT = "__none__";

// src/models/schema.ts
var SCHEMAS = {
  project: {
    kind: "project",
    label: "schema.project.label",
    labelPlural: "schema.project.labelPlural",
    icon: "folder",
    folder: "",
    layer: "project",
    titleField: "Name",
    fields: [{ key: "summary", label: "schema.project.fields.summary", type: "text" }],
    links: []
  },
  work: {
    kind: "work",
    label: "schema.work.label",
    labelPlural: "schema.work.labelPlural",
    icon: "pen-line",
    folder: "",
    layer: "text",
    titleField: "Name",
    fields: [
      {
        key: "format",
        label: "schema.work.fields.format",
        type: "select",
        required: true,
        options: [
          { value: "\u0421\u0435\u0440\u0438\u044F", color: "#9b59b6" },
          { value: "\u0412\u0430\u043D\u0448\u043E\u0442", color: "#4a9eff" }
        ]
      },
      {
        key: "type",
        label: "schema.work.fields.type",
        type: "select",
        required: true,
        options: [
          { value: "\u0420\u0430\u0441\u0441\u043A\u0430\u0437", color: "#4a9eff" },
          { value: "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439", color: "#7ed321" }
        ]
      },
      {
        key: "status",
        label: "schema.work.fields.status",
        type: "status",
        options: [
          { value: "\u041E\u0431\u044B\u0447\u043D\u043E\u0435", color: "#888" },
          { value: "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435", color: "#f5c518" },
          { value: "\u0410\u0440\u0445\u0438\u0432", color: "#c0392b" }
        ]
      },
      { key: "summary", label: "schema.work.fields.summary", type: "text" }
    ],
    links: [
      { key: "project", label: "schema.work.links.project", target: "project", single: true },
      { key: "books", label: "schema.work.links.books", target: "book", reverse: "work" },
      { key: "arcs", label: "schema.work.links.arcs", target: "arc", reverse: "work" },
      { key: "anchors", label: "schema.work.links.anchors", target: "anchor", reverse: "work" }
    ]
  },
  book: {
    kind: "book",
    label: "schema.book.label",
    labelPlural: "schema.book.labelPlural",
    icon: "book-open",
    folder: "\u041A\u043D\u0438\u0433\u0438",
    layer: "text",
    titleField: "Name",
    fields: [
      {
        key: "genre",
        label: "schema.book.fields.genre",
        type: "multiselect",
        options: [
          { value: "\u041F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435", color: "#9b59b6" },
          { value: "\u041A\u043E\u043C\u0435\u0434\u0438\u044F", color: "#e67e22" },
          { value: "\u0422\u0440\u0438\u043B\u043B\u0435\u0440", color: "#f5a623" },
          { value: "\u0414\u0440\u0430\u043C\u0430", color: "#4a9eff" },
          { value: "\u0424\u044D\u043D\u0442\u0435\u0437\u0438", color: "#7ed321" },
          { value: "\u041D\u0430\u0443\u0447\u043D\u0430\u044F \u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430", color: "#00bcd4" },
          { value: "\u0425\u043E\u0440\u0440\u043E\u0440", color: "#c0392b" },
          { value: "\u0420\u043E\u043C\u0430\u043D\u0442\u0438\u043A\u0430", color: "#e84393" },
          { value: "\u0414\u0435\u0442\u0435\u043A\u0442\u0438\u0432", color: "#8b5a2b" },
          { value: "\u0411\u043E\u0435\u0432\u0438\u043A", color: "#f5a623" }
        ]
      },
      {
        key: "format",
        label: "schema.book.fields.format",
        type: "select",
        required: true,
        options: [
          { value: "A4", color: "#c0392b" },
          { value: "WebToon", color: "#e67e22" }
        ]
      },
      { key: "audience", label: "schema.book.fields.audience", type: "number" },
      { key: "idea", label: "schema.book.fields.idea", type: "text" },
      { key: "synopsis", label: "schema.book.fields.synopsis", type: "text" },
      { key: "completed", label: "schema.book.fields.completed", type: "checkbox" }
    ],
    links: [
      { key: "work", label: "schema.book.links.work", target: "work", single: true, reverse: "books" },
      { key: "chapters", label: "schema.book.links.chapters", target: "chapter", reverse: "book" }
    ]
  },
  arc: {
    kind: "arc",
    label: "schema.arc.label",
    labelPlural: "schema.arc.labelPlural",
    icon: "git-branch",
    folder: "\u0410\u0440\u043A\u0438",
    layer: "text",
    titleField: "Name",
    fields: [
      { key: "goal", label: "schema.arc.fields.goal", type: "text" },
      { key: "description", label: "schema.arc.fields.description", type: "text" }
    ],
    links: [
      { key: "work", label: "schema.arc.links.work", target: "work", single: true, reverse: "arcs" },
      { key: "books", label: "schema.arc.links.books", target: "book" },
      { key: "chapters", label: "schema.arc.links.chapters", target: "chapter", reverse: "arc" },
      { key: "anchors", label: "schema.arc.links.anchors", target: "anchor", reverse: "arc" },
      { key: "keyCharacters", label: "schema.arc.links.keyCharacters", target: "character", reverse: "arcs" }
    ]
  },
  anchor: {
    kind: "anchor",
    label: "schema.anchor.label",
    labelPlural: "schema.anchor.labelPlural",
    icon: "anchor",
    folder: "\u042F\u043A\u043E\u0440\u044F",
    layer: "text",
    titleField: "Name",
    fields: [
      { key: "description", label: "schema.anchor.fields.description", type: "text" },
      { key: "date", label: "schema.anchor.fields.date", type: "text" },
      { key: "order", label: "schema.anchor.fields.order", type: "number" }
    ],
    links: [
      { key: "work", label: "schema.anchor.links.work", target: "work", single: true, reverse: "anchors" },
      { key: "arc", label: "schema.anchor.links.arc", target: "arc", single: true, reverse: "anchors" },
      { key: "chapters", label: "schema.anchor.links.chapters", target: "chapter", reverse: "anchors" },
      { key: "characters", label: "schema.anchor.links.characters", target: "character" }
    ]
  },
  chapter: {
    kind: "chapter",
    label: "schema.chapter.label",
    labelPlural: "schema.chapter.labelPlural",
    icon: "scroll",
    folder: "\u0413\u043B\u0430\u0432\u044B",
    layer: "text",
    titleField: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
    fields: [
      {
        key: "status",
        label: "schema.chapter.fields.status",
        type: "status",
        required: true,
        options: [
          { value: "\u0421\u043E\u0437\u0434\u0430\u043D\u043E", color: "#888" },
          { value: "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435", color: "#4a9eff" },
          { value: "\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A", color: "#f5a623" },
          { value: "\u0413\u043E\u0442\u043E\u0432\u043E", color: "#7ed321" },
          { value: "\u0410\u0440\u0445\u0438\u0432", color: "#c0392b" }
        ]
      },
      { key: "synopsis", label: "schema.chapter.fields.synopsis", type: "text" }
    ],
    links: [
      { key: "book", label: "schema.chapter.links.book", target: "book", single: true, reverse: "chapters" },
      { key: "arc", label: "schema.chapter.links.arc", target: "arc", reverse: "chapters" },
      { key: "anchors", label: "schema.chapter.links.anchors", target: "anchor", reverse: "chapters" },
      { key: "characters", label: "schema.chapter.links.characters", target: "character", reverse: "chapters" }
    ]
  },
  page: {
    kind: "page",
    label: "schema.page.label",
    labelPlural: "schema.page.labelPlural",
    icon: "file-text",
    folder: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
    layer: "text",
    titleField: "Name",
    fields: [{ key: "archived", label: "schema.page.fields.archived", type: "checkbox" }],
    links: [
      { key: "chapter", label: "schema.page.links.chapter", target: "chapter", single: true, reverse: "pages" },
      { key: "characters", label: "schema.page.links.characters", target: "character", reverse: "pages" }
    ]
  },
  character: {
    kind: "character",
    label: "schema.character.label",
    labelPlural: "schema.character.labelPlural",
    icon: "user",
    folder: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",
    layer: "world",
    titleField: "Name",
    fields: [
      // ── Основное ───────────────────────────────────────────────────────
      {
        key: "type",
        label: "schema.character.fields.type",
        type: "select",
        tab: "basic",
        options: [
          { value: "\u041F\u0440\u043E\u0442\u0430\u0433\u043E\u043D\u0438\u0441\u0442", color: "#7ed321" },
          { value: "\u0410\u043D\u0442\u0430\u0433\u043E\u043D\u0438\u0441\u0442", color: "#c0392b" },
          { value: "\u041F\u0440\u0435\u0441\u0442\u0443\u043F\u043D\u0438\u043A", color: "#8b5a2b" },
          { value: "\u0421\u043E\u044E\u0437\u043D\u0438\u043A", color: "#4a9eff" },
          { value: "\u041D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439", color: "#9b59b6" }
        ]
      },
      {
        key: "role",
        label: "schema.character.fields.role",
        type: "select",
        tab: "basic",
        options: [
          { value: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", color: "#7ed321" },
          { value: "\u041A\u043B\u044E\u0447\u0435\u0432\u0430\u044F", color: "#f5a623" },
          { value: "\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u0430\u044F", color: "#4a9eff" },
          { value: "\u042D\u043F\u0438\u0437\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0430\u044F", color: "#e84393" }
        ]
      },
      { key: "age", label: "schema.character.fields.age", type: "number", tab: "basic" },
      { key: "activity", label: "schema.character.fields.activity", type: "text", tab: "basic" },
      { key: "summary", label: "schema.character.fields.summary", type: "text", tab: "basic" },
      // ── Характеристики → История ───────────────────────────────────────
      { key: "storyGoalExternal", label: "schema.character.fields.storyGoalExternal", type: "text", tab: "characteristics", section: "story" },
      { key: "storyGoalInternal", label: "schema.character.fields.storyGoalInternal", type: "text", tab: "characteristics", section: "story" },
      { key: "initialBeliefs", label: "schema.character.fields.initialBeliefs", type: "text", tab: "characteristics", section: "story" },
      { key: "changedBeliefs", label: "schema.character.fields.changedBeliefs", type: "text", tab: "characteristics", section: "story" },
      { key: "changeDriver", label: "schema.character.fields.changeDriver", type: "text", tab: "characteristics", section: "story" },
      { key: "firstAppearance", label: "schema.character.fields.firstAppearance", type: "text", tab: "characteristics", section: "story" },
      { key: "plotInvolvement", label: "schema.character.fields.plotInvolvement", type: "text", tab: "characteristics", section: "story" },
      { key: "conflict", label: "schema.character.fields.conflict", type: "text", tab: "characteristics", section: "story" },
      { key: "decisiveMoment", label: "schema.character.fields.decisiveMoment", type: "text", tab: "characteristics", section: "story" },
      // ── Характеристики → Жизнь ────────────────────────────────────────
      { key: "skills", label: "schema.character.fields.skills", type: "text", tab: "characteristics", section: "life" },
      { key: "skillsOrigin", label: "schema.character.fields.skillsOrigin", type: "text", tab: "characteristics", section: "life" },
      { key: "strengthTalent", label: "schema.character.fields.strengthTalent", type: "text", tab: "characteristics", section: "life" },
      { key: "weakness", label: "schema.character.fields.weakness", type: "text", tab: "characteristics", section: "life" },
      { key: "hobbies", label: "schema.character.fields.hobbies", type: "text", tab: "characteristics", section: "life" },
      { key: "habits", label: "schema.character.fields.habits", type: "text", tab: "characteristics", section: "life" },
      { key: "health", label: "schema.character.fields.health", type: "text", tab: "characteristics", section: "life" },
      { key: "speech", label: "schema.character.fields.speech", type: "text", tab: "characteristics", section: "life" },
      { key: "pet", label: "schema.character.fields.pet", type: "text", tab: "characteristics", section: "life" },
      { key: "specialItems", label: "schema.character.fields.specialItems", type: "text", tab: "characteristics", section: "life" },
      { key: "residence", label: "schema.character.fields.residence", type: "text", tab: "characteristics", section: "life" },
      { key: "homeDescription", label: "schema.character.fields.homeDescription", type: "text", tab: "characteristics", section: "life" },
      { key: "neighbors", label: "schema.character.fields.neighbors", type: "text", tab: "characteristics", section: "life" },
      { key: "organizations", label: "schema.character.fields.organizations", type: "text", tab: "characteristics", section: "life" },
      { key: "income", label: "schema.character.fields.income", type: "text", tab: "characteristics", section: "life" },
      { key: "occupation", label: "schema.character.fields.occupation", type: "text", tab: "characteristics", section: "life" },
      { key: "jobTitle", label: "schema.character.fields.jobTitle", type: "text", tab: "characteristics", section: "life" },
      { key: "jobSatisfaction", label: "schema.character.fields.jobSatisfaction", type: "text", tab: "characteristics", section: "life" },
      // ── Характеристики → Мироощущение ─────────────────────────────────
      { key: "personalityTraits", label: "schema.character.fields.personalityTraits", type: "text", tab: "characteristics", section: "worldview" },
      { key: "moralValues", label: "schema.character.fields.moralValues", type: "text", tab: "characteristics", section: "worldview" },
      { key: "drivingForce", label: "schema.character.fields.drivingForce", type: "text", tab: "characteristics", section: "worldview" },
      { key: "discouragement", label: "schema.character.fields.discouragement", type: "text", tab: "characteristics", section: "worldview" },
      { key: "philosophicalViews", label: "schema.character.fields.philosophicalViews", type: "text", tab: "characteristics", section: "worldview" },
      { key: "biggestFear", label: "schema.character.fields.biggestFear", type: "text", tab: "characteristics", section: "worldview" },
      { key: "selfControl", label: "schema.character.fields.selfControl", type: "text", tab: "characteristics", section: "worldview" },
      { key: "intelligenceLevel", label: "schema.character.fields.intelligenceLevel", type: "text", tab: "characteristics", section: "worldview" },
      { key: "confidenceLevel", label: "schema.character.fields.confidenceLevel", type: "text", tab: "characteristics", section: "worldview" },
      // ── Биография ─────────────────────────────────────────────────────
      { key: "childhood", label: "schema.character.fields.childhood", type: "text", tab: "biography" },
      { key: "importantPastEvent", label: "schema.character.fields.importantPastEvent", type: "text", tab: "biography" },
      { key: "bestAchievement", label: "schema.character.fields.bestAchievement", type: "text", tab: "biography" },
      { key: "otherAchievements", label: "schema.character.fields.otherAchievements", type: "text", tab: "biography" },
      { key: "worstMoment", label: "schema.character.fields.worstMoment", type: "text", tab: "biography" },
      { key: "failures", label: "schema.character.fields.failures", type: "text", tab: "biography" },
      { key: "secrets", label: "schema.character.fields.secrets", type: "text", tab: "biography" },
      { key: "bestMemories", label: "schema.character.fields.bestMemories", type: "text", tab: "biography" },
      { key: "worstMemories", label: "schema.character.fields.worstMemories", type: "text", tab: "biography" },
      // ── Внешность ─────────────────────────────────────────────────────
      { key: "height", label: "schema.character.fields.height", type: "text", tab: "appearance" },
      { key: "weight", label: "schema.character.fields.weight", type: "text", tab: "appearance" },
      { key: "build", label: "schema.character.fields.build", type: "text", tab: "appearance" },
      { key: "skinColor", label: "schema.character.fields.skinColor", type: "text", tab: "appearance" },
      { key: "hairstyle", label: "schema.character.fields.hairstyle", type: "text", tab: "appearance" },
      { key: "hairColor", label: "schema.character.fields.hairColor", type: "text", tab: "appearance" },
      { key: "eyeShape", label: "schema.character.fields.eyeShape", type: "text", tab: "appearance" },
      { key: "eyeColor", label: "schema.character.fields.eyeColor", type: "text", tab: "appearance" },
      { key: "faceShape", label: "schema.character.fields.faceShape", type: "text", tab: "appearance" },
      { key: "distinctiveFeatures", label: "schema.character.fields.distinctiveFeatures", type: "text", tab: "appearance" },
      { key: "otherFaceFeatures", label: "schema.character.fields.otherFaceFeatures", type: "text", tab: "appearance" },
      { key: "posture", label: "schema.character.fields.posture", type: "text", tab: "appearance" },
      { key: "otherAppearance", label: "schema.character.fields.otherAppearance", type: "text", tab: "appearance" },
      { key: "ethnicity", label: "schema.character.fields.ethnicity", type: "text", tab: "appearance" },
      { key: "clothing", label: "schema.character.fields.clothing", type: "text", tab: "appearance" },
      { key: "accessories", label: "schema.character.fields.accessories", type: "text", tab: "appearance" }
    ],
    links: [
      { key: "project", label: "schema.character.links.project", target: "project", single: true },
      { key: "works", label: "schema.character.links.works", target: "work" },
      { key: "arcs", label: "schema.character.links.arcs", target: "arc", reverse: "keyCharacters" },
      { key: "affiliation", label: "schema.character.links.affiliation", target: "categoryItem", reverse: "members" }
    ]
  },
  category: {
    kind: "category",
    label: "schema.category.label",
    labelPlural: "schema.category.labelPlural",
    icon: "tag",
    folder: "",
    layer: "world",
    titleField: "Name",
    fields: [{ key: "summary", label: "schema.category.fields.summary", type: "text" }],
    links: [{ key: "project", label: "schema.category.links.project", target: "project", single: true }]
  },
  // Базовая схема элемента категории — поля/связи дополняются динамически.
  categoryItem: {
    kind: "categoryItem",
    label: "schema.categoryItem.label",
    labelPlural: "schema.categoryItem.labelPlural",
    icon: "circle-dot",
    folder: "",
    layer: "world",
    titleField: "Name",
    fields: [],
    links: [{ key: "works", label: "schema.categoryItem.links.works", target: "work" }]
  }
};
var KINDS = [
  "project",
  "work",
  "book",
  "arc",
  "anchor",
  "chapter",
  "page",
  "character",
  "category",
  "categoryItem"
];
var CATEGORY_PRESETS = {
  organization: {
    icon: "building-2",
    preset: "organization",
    fields: [
      {
        key: "type",
        label: "schema.categoryPreset.organization.type",
        type: "select",
        options: [
          { value: "\u0421\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u0438", color: "#f5a623" },
          { value: "\u041F\u0440\u0435\u0441\u0442\u0443\u043F\u043D\u0438\u043A\u0438", color: "#e84393" },
          { value: "\u0421\u041C\u0418", color: "#c0392b" },
          { value: "\u041C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u0430\u044F \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F", color: "#9b59b6" },
          { value: "\u0421\u043E\u0431\u0438\u0440\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430", color: "#8b5a2b" },
          { value: "\u0414\u0440\u0443\u0433\u043E\u0435", color: "#7ed321" }
        ]
      },
      { key: "summary", label: "schema.categoryPreset.organization.summary", type: "text" }
    ],
    linkDefs: [
      { key: "leader", label: "schema.categoryPreset.organization.linkDefs.leader", target: "character", single: true },
      { key: "members", label: "schema.categoryPreset.organization.linkDefs.members", target: "character", reverse: "affiliation" }
    ]
  },
  location: {
    icon: "map-pin",
    preset: "location",
    fields: [
      {
        key: "type",
        label: "schema.categoryPreset.location.type",
        type: "select",
        options: [
          { value: "\u041B\u043E\u043A\u0430\u0446\u0438\u044F", color: "#f5a623" },
          { value: "\u0413\u043E\u0440\u043E\u0434", color: "#e67e22" },
          { value: "\u0420\u0430\u0439\u043E\u043D", color: "#e84393" },
          { value: "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E", color: "#7ed321" }
        ]
      },
      { key: "country", label: "schema.categoryPreset.location.country", type: "text" },
      { key: "summary", label: "schema.categoryPreset.location.summary", type: "text" }
    ],
    linkDefs: []
  },
  language: {
    icon: "languages",
    preset: "language",
    fields: [
      {
        key: "type",
        label: "schema.categoryPreset.language.type",
        type: "select",
        options: [
          { value: "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439", color: "#4a9eff" },
          { value: "\u0414\u0438\u0430\u043B\u0435\u043A\u0442", color: "#f5a623" },
          { value: "\u041C\u0451\u0440\u0442\u0432\u044B\u0439", color: "#888" },
          { value: "\u0421\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0439", color: "#9b59b6" }
        ]
      },
      { key: "region", label: "schema.categoryPreset.language.region", type: "text" },
      { key: "summary", label: "schema.categoryPreset.language.summary", type: "text" }
    ],
    linkDefs: []
  },
  custom: {
    icon: "shapes",
    preset: "custom",
    fields: [{ key: "summary", label: "schema.categoryPreset.custom.summary", type: "text" }],
    linkDefs: []
  }
};
var PRESET_LABELS = {
  organization: "schema.preset.organization",
  location: "schema.preset.location",
  language: "schema.preset.language",
  custom: "schema.preset.custom"
};
function resolveSchema(entity, store) {
  if (entity.kind === "categoryItem") {
    const catId = (entity.links["category"] || [])[0];
    const category = catId ? store.get(catId) : null;
    const def = category == null ? void 0 : category.categorySchema;
    const base = SCHEMAS.categoryItem;
    if (def) {
      return {
        icon: def.icon,
        label: category ? category.name : base.label,
        fields: def.fields,
        links: [...base.links, ...def.linkDefs]
      };
    }
    return { icon: base.icon, label: base.label, fields: base.fields, links: base.links };
  }
  const s = SCHEMAS[entity.kind];
  if (!s) {
    const base = SCHEMAS.categoryItem;
    return { icon: base.icon, label: entity.kind, fields: [], links: base.links };
  }
  return { icon: s.icon, label: s.label, fields: s.fields, links: s.links };
}
function findLinkDef(entity, key, store) {
  return resolveSchema(entity, store).links.find((l) => l.key === key) || null;
}

// src/models/ScenaristStore.ts
var INDEX_PATH = ".obsidian/plugins/obsidian-scenarist/scenarist-index.json";
var LEGACY_INDEX_PATH = ".scenarist/index.json";
var ScenaristStore = class {
  constructor(plugin) {
    this.entities = /* @__PURE__ */ new Map();
    this.activeProjectId = NO_PROJECT;
    this.listeners = [];
    this.saveTimer = null;
    // ---- Вторичные индексы ----
    /** kind → Set<id> */
    this.byKindIndex = /* @__PURE__ */ new Map();
    /** filePath → id */
    this.byPathIndex = /* @__PURE__ */ new Map();
    this.plugin = plugin;
  }
  // ---- подписки ----
  onChange(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
  notify() {
    this.listeners.forEach((fn) => fn());
  }
  // ---- доступ ----
  get(id) {
    return this.entities.get(id) || null;
  }
  all() {
    return Array.from(this.entities.values());
  }
  /** O(1) — использует вторичный индекс. */
  byKind(kind) {
    const ids = this.byKindIndex.get(kind);
    if (!ids)
      return [];
    const result = [];
    for (const id of ids) {
      const e = this.entities.get(id);
      if (e)
        result.push(e);
    }
    return result;
  }
  /** O(1) — использует вторичный индекс. */
  findByPath(path) {
    var _a;
    const id = this.byPathIndex.get(path);
    return id ? (_a = this.entities.get(id)) != null ? _a : null : null;
  }
  // ---- проекты ----
  getProjects() {
    return this.byKind("project");
  }
  getActiveProjectId() {
    return this.activeProjectId || NO_PROJECT;
  }
  getActiveProject() {
    const id = this.getActiveProjectId();
    return id === NO_PROJECT ? null : this.entities.get(id) || null;
  }
  setActiveProject(id) {
    this.activeProjectId = id;
    this.scheduleSave();
    this.notify();
  }
  /** Принадлежит ли сущность активному проекту (по связи project). */
  inActiveProject(e) {
    const pid = this.getActiveProjectId();
    const linked = e.links["project"] || [];
    if (pid === NO_PROJECT)
      return linked.length === 0;
    return linked.includes(pid);
  }
  /** Project-level сущности (work/character/category) активного проекта. */
  byKindForProject(kind) {
    return this.byKind(kind).filter((e) => this.inActiveProject(e));
  }
  // ---- категории ----
  categoryItems(categoryId) {
    return this.byKind("categoryItem").filter((e) => (e.links["category"] || []).includes(categoryId));
  }
  // ---- мутации ----
  create(kind, name) {
    const entity = {
      id: this.generateId(),
      kind,
      name,
      filePath: "",
      props: {},
      links: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    this.entities.set(entity.id, entity);
    this.indexAdd(entity);
    this.attachToActiveProject(entity);
    this.scheduleSave();
    this.notify();
    return entity;
  }
  createProject(name) {
    const p = {
      id: this.generateId(),
      kind: "project",
      name,
      filePath: "",
      props: {},
      links: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    this.entities.set(p.id, p);
    this.indexAdd(p);
    this.activeProjectId = p.id;
    this.scheduleSave();
    this.notify();
    return p;
  }
  createCategory(preset, name) {
    const def = CATEGORY_PRESETS[preset];
    const cat = this.create("category", name);
    cat.categorySchema = {
      icon: def.icon,
      preset: def.preset,
      fields: def.fields.map((f) => ({ ...f })),
      linkDefs: def.linkDefs.map((l) => ({ ...l }))
    };
    this.scheduleSave();
    this.notify();
    return cat;
  }
  createItem(categoryId, name) {
    const item = this.create("categoryItem", name);
    this.setLink(item.id, "category", [categoryId]);
    return item;
  }
  /** Привязать project-level сущность к активному проекту. */
  attachToActiveProject(e) {
    const projectScoped = ["work", "character", "category", "categoryItem"];
    if (!projectScoped.includes(e.kind))
      return;
    const pid = this.getActiveProjectId();
    if (pid !== NO_PROJECT)
      e.links["project"] = [pid];
  }
  rename(id, name) {
    const e = this.entities.get(id);
    if (!e)
      return;
    e.name = name;
    e.updatedAt = Date.now();
    this.scheduleSave();
    this.notify();
  }
  setProp(id, key, value) {
    const e = this.entities.get(id);
    if (!e)
      return;
    e.props[key] = value;
    e.updatedAt = Date.now();
    this.scheduleSave();
    this.notify();
  }
  setFilePath(id, filePath) {
    const e = this.entities.get(id);
    if (!e)
      return;
    if (e.filePath)
      this.byPathIndex.delete(e.filePath);
    e.filePath = filePath;
    if (filePath)
      this.byPathIndex.set(filePath, id);
    this.scheduleSave();
  }
  /** Установить связь с поддержкой реципрокности (LinkDef.reverse). */
  setLink(id, key, targetIds) {
    const e = this.entities.get(id);
    if (!e)
      return;
    const prev = e.links[key] || [];
    const removed = prev.filter((t2) => !targetIds.includes(t2));
    const added = targetIds.filter((t2) => !prev.includes(t2));
    e.links[key] = [...targetIds];
    e.updatedAt = Date.now();
    const def = findLinkDef(e, key, this);
    const reverse = def == null ? void 0 : def.reverse;
    if (reverse) {
      for (const tid of added)
        this.addReverse(tid, reverse, id);
      for (const tid of removed)
        this.removeReverse(tid, reverse, id);
    }
    this.scheduleSave();
    this.notify();
  }
  addReverse(id, key, value) {
    const e = this.entities.get(id);
    if (!e)
      return;
    const cur = new Set(e.links[key] || []);
    cur.add(value);
    e.links[key] = Array.from(cur);
    e.updatedAt = Date.now();
  }
  removeReverse(id, key, value) {
    const e = this.entities.get(id);
    if (!e)
      return;
    e.links[key] = (e.links[key] || []).filter((v) => v !== value);
    e.updatedAt = Date.now();
  }
  delete(id) {
    const e = this.entities.get(id);
    if (!e)
      return;
    if (e.kind === "category") {
      for (const item of this.categoryItems(id))
        this.delete(item.id);
    }
    for (const key of Object.keys(e.links)) {
      const def = findLinkDef(e, key, this);
      if (def == null ? void 0 : def.reverse) {
        for (const tid of e.links[key])
          this.removeReverse(tid, def.reverse, id);
      }
    }
    for (const other of this.entities.values()) {
      for (const key of Object.keys(other.links)) {
        if (other.links[key].includes(id)) {
          other.links[key] = other.links[key].filter((v) => v !== id);
        }
      }
    }
    this.indexRemove(e);
    this.entities.delete(id);
    if (this.activeProjectId === id)
      this.activeProjectId = NO_PROJECT;
    this.scheduleSave();
    this.notify();
  }
  /**
   * Вставить сущность с уже известным ID (восстановление из frontmatter).
   * Не привязывает к активному проекту — данные берутся как есть.
   */
  importEntity(entity) {
    if (this.entities.has(entity.id))
      return;
    this.entities.set(entity.id, entity);
    this.indexAdd(entity);
    this.scheduleSave();
    this.notify();
  }
  schema(kind) {
    return SCHEMAS[kind];
  }
  resolved(entity) {
    return resolveSchema(entity, this);
  }
  // ---- вторичные индексы ----
  indexAdd(e) {
    let set = this.byKindIndex.get(e.kind);
    if (!set) {
      set = /* @__PURE__ */ new Set();
      this.byKindIndex.set(e.kind, set);
    }
    set.add(e.id);
    if (e.filePath)
      this.byPathIndex.set(e.filePath, e.id);
  }
  indexRemove(e) {
    var _a;
    (_a = this.byKindIndex.get(e.kind)) == null ? void 0 : _a.delete(e.id);
    if (e.filePath)
      this.byPathIndex.delete(e.filePath);
  }
  rebuildIndexes() {
    this.byKindIndex.clear();
    this.byPathIndex.clear();
    for (const e of this.entities.values()) {
      this.indexAdd(e);
    }
  }
  // ---- персистентность ----
  async load() {
    try {
      const adapter = this.plugin.app.vault.adapter;
      let raw = null;
      try {
        raw = await adapter.read(INDEX_PATH);
      } catch (e) {
        try {
          raw = await adapter.read(LEGACY_INDEX_PATH);
          console.log("Scenarist: \u043C\u0438\u0433\u0440\u0438\u0440\u0443\u0435\u043C index.json \u0438\u0437 .scenarist/ \u0432 \u043F\u0430\u043F\u043A\u0443 \u043F\u043B\u0430\u0433\u0438\u043D\u0430");
        } catch (e2) {
        }
      }
      if (raw) {
        const data = JSON.parse(raw);
        this.entities.clear();
        (data.entities || []).forEach((e) => {
          e.props = e.props || {};
          e.links = e.links || {};
          this.entities.set(e.id, e);
        });
        this.activeProjectId = data.activeProjectId || NO_PROJECT;
        this.migrateCategoryIcons();
      }
      this.rebuildIndexes();
      if (raw)
        await this.save();
    } catch (err) {
      console.error("Scenarist: \u043E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u043D\u0434\u0435\u043A\u0441\u0430", err);
    }
    this.notify();
  }
  /** Мигрирует старые emoji-иконки в categorySchema.icon → Lucide-имена. */
  migrateCategoryIcons() {
    const emojiMap = {
      "\u265B": "building-2",
      "\u{1F4CD}": "map-pin",
      "\u{1F310}": "languages",
      "\u2B21": "shapes",
      "\u{1F5C2}": "tag"
    };
    let changed = false;
    for (const entity of this.entities.values()) {
      if (entity.kind === "category" && entity.categorySchema) {
        const mapped = emojiMap[entity.categorySchema.icon];
        if (mapped) {
          entity.categorySchema.icon = mapped;
          changed = true;
        }
      }
    }
    if (changed)
      this.scheduleSave();
  }
  scheduleSave() {
    if (this.saveTimer !== null)
      window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => this.save(), 400);
  }
  async save() {
    const index = {
      version: INDEX_VERSION,
      activeProjectId: this.activeProjectId,
      entities: this.all()
    };
    const adapter = this.plugin.app.vault.adapter;
    try {
      const dir = INDEX_PATH.split("/").slice(0, -1).join("/");
      if (!await adapter.exists(dir))
        await adapter.mkdir(dir);
      await adapter.write(INDEX_PATH, JSON.stringify(index, null, 2));
      for (const entity of this.entities.values()) {
        if (entity.filePath) {
          try {
            await adapter.write(this.sidecarPath(entity.filePath), JSON.stringify(entity, null, 2));
          } catch (e) {
          }
        }
      }
    } catch (e) {
      console.error("Scenarist: \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u043D\u0434\u0435\u043A\u0441", e);
    }
  }
  /** Путь к sidecar-файлу рядом с .md заметкой. */
  sidecarPath(filePath) {
    return filePath.replace(/\.md$/, ".sc");
  }
  /** Прочитать sidecar-файл и вернуть Entity, или null если его нет. */
  async readSidecar(filePath) {
    try {
      const raw = await this.plugin.app.vault.adapter.read(this.sidecarPath(filePath));
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }
  // ---- утилиты ----
  generateId() {
    return nanoid(12);
  }
};

// src/sync/SyncEngine.ts
var import_obsidian2 = require("obsidian");

// src/templates/index.ts
function bodyTemplate(kind, name) {
  switch (kind) {
    case "character":
      return characterBody(name);
    case "project":
      return `# ${name}

## \u041E \u043F\u0440\u043E\u0435\u043A\u0442\u0435
> *\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u0432\u0441\u0435\u043B\u0435\u043D\u043D\u0430\u044F / \u0441\u0431\u043E\u0440\u043D\u0438\u043A \u0438\u0441\u0442\u043E\u0440\u0438\u0439.*

## \u0417\u0430\u043C\u0435\u0442\u043A\u0438
- 
`;
    case "work":
      return `# ${name}

## \u041B\u043E\u0433\u043B\u0430\u0439\u043D
> *\u041E\u0434\u043D\u043E \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435, \u043E \u0447\u0451\u043C \u044D\u0442\u043E.*

## \u0422\u0435\u043C\u044B
- 
`;
    case "book":
      return `# ${name}

## \u0421\u0438\u043D\u043E\u043F\u0441\u0438\u0441

## \u0418\u0434\u0435\u044F

`;
    case "arc":
      return `# ${name}

## \u0426\u0435\u043B\u044C \u0430\u0440\u043A\u0438

## \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435

## \u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F
- 
`;
    case "anchor":
      return `# ${name}

## \u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442
> *\u0421\u0443\u0442\u044C \u043A\u043B\u044E\u0447\u0435\u0432\u043E\u0433\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u044F.*

## \u041F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u044F
- 
`;
    case "chapter":
      return `# ${name}

## \u0421\u0438\u043D\u043E\u043F\u0441\u0438\u0441

---

## \u0421\u0446\u0435\u043D\u0430

> *\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u0431\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438.*

`;
    case "page":
      return `# ${name}

> *\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B / \u0440\u0430\u0441\u043A\u0430\u0434\u0440\u043E\u0432\u043A\u0430.*

`;
    case "categoryItem":
      return `# ${name}

## \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435

## \u0414\u0435\u0442\u0430\u043B\u0438

`;
    default:
      return `# ${name}
`;
  }
}
function characterBody(_name) {
  return `## \u0421\u0435\u043C\u044C\u044F \u0438 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F


## \u041D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0435 \u0438\u043C\u044F


## \u041C\u0435\u0441\u0442\u043E \u0438 \u0434\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F


## \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E

`;
}

// src/sync/SyncEngine.ts
var SyncEngine = class {
  constructor(plugin) {
    /**
     * Пути файлов, куда плагин сам только что записал через processFrontMatter.
     * Используется для подавления ложных срабатываний handleModify.
     */
    this.selfWrites = /* @__PURE__ */ new Set();
    this.plugin = plugin;
  }
  get store() {
    return this.plugin.store;
  }
  get vault() {
    return this.plugin.app.vault;
  }
  // ---- обход графа вверх ----
  single(ids) {
    if (!ids || ids.length === 0)
      return null;
    return this.store.get(ids[0]);
  }
  ownerWork(e) {
    switch (e.kind) {
      case "work":
        return e;
      case "book":
      case "arc":
      case "anchor":
        return this.single(e.links["work"]);
      case "chapter": {
        const b = this.single(e.links["book"]);
        return b ? this.single(b.links["work"]) : null;
      }
      case "page": {
        const c = this.single(e.links["chapter"]);
        const b = c ? this.single(c.links["book"]) : null;
        return b ? this.single(b.links["work"]) : null;
      }
      default:
        return null;
    }
  }
  ownerProjectName(e) {
    let pid = null;
    if (e.kind === "project")
      pid = e.id;
    else if ((e.links["project"] || []).length)
      pid = e.links["project"][0];
    else {
      const w = this.ownerWork(e);
      pid = w ? (w.links["project"] || [])[0] || null : null;
    }
    const p = pid ? this.store.get(pid) : null;
    return p ? this.safe(p.name) : "_\u0411\u0435\u0437 \u043F\u0440\u043E\u0435\u043A\u0442\u0430";
  }
  safe(name) {
    return name.replace(/[\\/:*?"<>|]/g, "-").trim() || "\u0411\u0435\u0437 \u0438\u043C\u0435\u043D\u0438";
  }
  /** Путь к заметке сущности. */
  buildPath(entity) {
    const root = this.plugin.settings.rootFolder || "Scenarist";
    const proj = this.ownerProjectName(entity);
    const projFolder = `${root}/${proj}`;
    const name = this.safe(entity.name);
    switch (entity.kind) {
      case "project":
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${name}.md`);
      case "work":
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${name}/${name}.md`);
      case "character":
        return (0, import_obsidian2.normalizePath)(`${projFolder}/\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438/${name}.md`);
      case "category":
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${name}/${name}.md`);
      case "categoryItem": {
        const cat = this.single(entity.links["category"]);
        const catName = cat ? this.safe(cat.name) : "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F";
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${catName}/${name}.md`);
      }
      default: {
        const work = this.ownerWork(entity);
        const workName = work ? this.safe(work.name) : "_\u0411\u0435\u0437 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F";
        const folder = SCHEMAS[entity.kind].folder;
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${workName}/${folder}/${name}.md`);
      }
    }
  }
  async ensureNote(entity) {
    const path = this.buildPath(entity);
    this.store.setFilePath(entity.id, path);
    let file = this.vault.getAbstractFileByPath(path);
    if (!file) {
      await this.ensureFolder(path);
      const body = bodyTemplate(entity.kind, entity.name);
      file = await this.vault.create(path, body);
    }
    if (file instanceof import_obsidian2.TFile) {
      await this.syncToNote(entity, file);
    }
    return file instanceof import_obsidian2.TFile ? file : null;
  }
  /**
   * Синхронизирует frontmatter заметки с данными сущности.
   * Использует `processFrontMatter` — атомарная операция, не трогает тело файла.
   */
  async syncToNote(entity, fileArg) {
    const file = fileArg != null ? fileArg : entity.filePath ? this.vault.getAbstractFileByPath(entity.filePath) : null;
    if (!(file instanceof import_obsidian2.TFile))
      return;
    this.selfWrites.add(file.path);
    await this.plugin.app.fileManager.processFrontMatter(file, (fm) => {
      fm["scenarist_id"] = entity.id;
      fm["kind"] = entity.kind;
      const schema = this.store.resolved(entity);
      for (const field of schema.fields) {
        const v = entity.props[field.key];
        if (v === void 0 || v === null || v === "") {
          delete fm[field.key];
        } else {
          fm[field.key] = v;
        }
      }
      for (const link of schema.links) {
        if (link.target === "project")
          continue;
        const ids = entity.links[link.key] || [];
        const names = ids.map((id) => this.store.get(id)).filter((e) => !!e).map((e) => `[[${e.name}]]`);
        if (names.length) {
          fm[link.key] = names;
        } else {
          delete fm[link.key];
        }
      }
    });
  }
  async openNote(entity) {
    const file = await this.ensureNote(entity);
    if (file)
      await this.plugin.app.workspace.getLeaf(false).openFile(file);
  }
  /**
   * Удаляет сущность из Store и перемещает её .md-файл в корзину.
   * Для категорий удаляет файлы всех дочерних элементов тоже.
   */
  async deleteEntity(id) {
    const ids = [id];
    const entity = this.store.get(id);
    if ((entity == null ? void 0 : entity.kind) === "category") {
      for (const item of this.store.categoryItems(id))
        ids.push(item.id);
    }
    for (const eid of ids) {
      const e = this.store.get(eid);
      if (e == null ? void 0 : e.filePath) {
        const file = this.vault.getAbstractFileByPath(e.filePath);
        if (file instanceof import_obsidian2.TFile) {
          await this.plugin.app.fileManager.trashFile(file);
        }
      }
    }
    this.store.delete(id);
  }
  /**
   * Обрабатывает внешнее изменение .md файла.
   * Читает frontmatter через MetadataCache и обновляет Store.
   */
  handleModify(file) {
    var _a, _b;
    if (this.selfWrites.has(file.path)) {
      this.selfWrites.delete(file.path);
      return;
    }
    const entity = this.store.findByPath(file.path);
    if (!entity)
      return;
    const fm = (_a = this.plugin.app.metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter;
    if (!fm)
      return;
    const fields = this.store.resolved(entity).fields;
    let changed = false;
    for (const field of fields) {
      if (field.key in fm && entity.props[field.key] !== fm[field.key]) {
        entity.props[field.key] = (_b = fm[field.key]) != null ? _b : null;
        changed = true;
      }
    }
    if (changed)
      void this.store.save();
  }
  handleRename(file, oldPath) {
    const entity = this.store.findByPath(oldPath);
    if (!entity)
      return;
    const oldSidecar = this.store.sidecarPath(oldPath);
    const newSidecar = this.store.sidecarPath(file.path);
    if (oldSidecar !== newSidecar) {
      const sf = this.vault.getAbstractFileByPath(oldSidecar);
      if (sf instanceof import_obsidian2.TFile)
        void this.vault.rename(sf, newSidecar);
    }
    this.store.setFilePath(entity.id, file.path);
    this.syncProjectLink(entity, file.path);
    this.plugin.refreshViews();
  }
  /**
   * Вызывается при создании файла в vault (например, скопирован снаружи).
   * MetadataCache может ещё не проиндексировать файл, поэтому откладываем на 600 мс.
   */
  handleCreate(file) {
    window.setTimeout(() => void this.processCreatedFile(file), 600);
  }
  /**
   * Сканирует все .md-файлы vault:
   * - обновляет filePath для сущностей, у которых путь устарел;
   * - исправляет project-ссылку по расположению файла;
   * - восстанавливает сущности из sidecar .sc (приоритет над frontmatter).
   */
  async rescanVault() {
    var _a, _b;
    const { metadataCache } = this.plugin.app;
    const files = this.vault.getMarkdownFiles();
    let changed = false;
    for (const file of files) {
      const sidecar = await this.store.readSidecar(file.path);
      const fm = (_a = metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter;
      const id = (_b = sidecar == null ? void 0 : sidecar.id) != null ? _b : (fm == null ? void 0 : fm.scenarist_id) ? String(fm.scenarist_id) : null;
      if (!id)
        continue;
      const existing = this.store.get(id);
      if (existing) {
        if (existing.filePath !== file.path) {
          this.store.setFilePath(id, file.path);
          changed = true;
        }
        if (this.syncProjectLink(existing, file.path))
          changed = true;
      } else if (sidecar) {
        sidecar.filePath = file.path;
        this.store.importEntity(sidecar);
        changed = true;
      } else if (fm == null ? void 0 : fm.kind) {
        this.importEntityFromFm(file, fm);
        changed = true;
      }
    }
    if (changed) {
      void this.store.save();
      this.plugin.refreshViews();
    }
  }
  // ---- private helpers ----
  /**
   * По пути файла определяет проект (root/ProjectFolder/...) и
   * обновляет project-ссылку у project-scoped сущностей если она отличается.
   * Возвращает true если ссылка была изменена.
   */
  syncProjectLink(entity, filePath) {
    const projectScoped = ["work", "character", "category", "categoryItem"];
    if (!projectScoped.includes(entity.kind))
      return false;
    const project = this.inferProjectFromPath(filePath);
    if (!project)
      return false;
    const currentPid = (entity.links["project"] || [])[0];
    if (currentPid === project.id)
      return false;
    entity.links["project"] = [project.id];
    entity.updatedAt = Date.now();
    return true;
  }
  /**
   * Определяет проект по пути файла: root/{ProjectFolder}/...
   * Ищет project-сущность, чьё safe(name) совпадает с именем папки.
   */
  inferProjectFromPath(filePath) {
    const root = (0, import_obsidian2.normalizePath)(this.plugin.settings.rootFolder || "Scenarist");
    const parts = filePath.split("/");
    if (parts.length < 3)
      return null;
    if (parts[0] !== root)
      return null;
    const projFolder = parts[1];
    return this.store.byKind("project").find(
      (p) => this.safe(p.name) === projFolder || p.name === projFolder
    ) || null;
  }
  async processCreatedFile(file) {
    var _a, _b;
    const sidecar = await this.store.readSidecar(file.path);
    const fm = (_a = this.plugin.app.metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter;
    const id = (_b = sidecar == null ? void 0 : sidecar.id) != null ? _b : (fm == null ? void 0 : fm.scenarist_id) ? String(fm.scenarist_id) : null;
    if (!id)
      return;
    const existing = this.store.get(id);
    if (existing) {
      let changed = false;
      if (existing.filePath !== file.path) {
        this.store.setFilePath(id, file.path);
        changed = true;
      }
      if (this.syncProjectLink(existing, file.path))
        changed = true;
      if (changed) {
        void this.store.save();
        this.plugin.refreshViews();
      }
    } else if (sidecar) {
      sidecar.filePath = file.path;
      this.store.importEntity(sidecar);
      this.plugin.refreshViews();
    } else if (fm == null ? void 0 : fm.kind) {
      this.importEntityFromFm(file, fm);
      this.plugin.refreshViews();
    }
  }
  /**
   * Восстанавливает сущность из frontmatter файла и добавляет её в Store.
   * Поля восстанавливаются; project-ссылка выводится из пути файла.
   */
  importEntityFromFm(file, fm) {
    const kind = fm.kind;
    if (!KINDS.includes(kind))
      return;
    const id = String(fm.scenarist_id);
    const schema = SCHEMAS[kind];
    const props = {};
    for (const field of schema.fields) {
      const v = fm[field.key];
      if (v !== void 0 && v !== null) {
        props[field.key] = v;
      }
    }
    const links = {};
    const project = this.inferProjectFromPath(file.path);
    const projectScoped = ["work", "character", "category", "categoryItem"];
    if (project && projectScoped.includes(kind)) {
      links["project"] = [project.id];
    }
    const entity = {
      id,
      kind,
      name: file.basename,
      filePath: file.path,
      props,
      links,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    this.store.importEntity(entity);
  }
  // ---- helpers ----
  async ensureFolder(filePath) {
    const dir = filePath.split("/").slice(0, -1).join("/");
    if (!dir)
      return;
    let cur = "";
    for (const part of dir.split("/")) {
      cur = cur ? `${cur}/${part}` : part;
      if (!await this.vault.adapter.exists(cur)) {
        try {
          await this.vault.createFolder(cur);
        } catch (e) {
        }
      }
    }
  }
};

// src/state/ScenaristState.ts
var ScenaristState = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.selectedId = null;
    this.timelineWorkId = null;
    this.history = [];
    this.listeners = [];
    this.saveTimer = null;
  }
  // ---- навигация ----
  select(id) {
    this.selectedId = id;
    this.plugin.settings.lastSelectedId = id != null ? id : void 0;
    this.debounceSave();
    this.notify();
  }
  navigateTo(id) {
    if (this.selectedId && this.selectedId !== id) {
      this.history.push(this.selectedId);
    }
    this.select(id);
  }
  back() {
    const prev = this.history.pop();
    if (prev)
      this.select(prev);
  }
  canGoBack() {
    return this.history.length > 0;
  }
  // ---- подписки ----
  /** Подписаться на смену выбора. Возвращает функцию отписки. */
  onSelect(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
  /** Сообщить всем подписчикам об изменении (используется при обновлении Store). */
  notify() {
    this.listeners.forEach((fn) => fn());
  }
  // ---- сброс ----
  /** Вызывается при onunload: немедленно сохраняем settings без debounce. */
  flushSave() {
    if (this.saveTimer !== null) {
      window.clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }
  }
  // ---- private ----
  debounceSave() {
    if (this.saveTimer !== null)
      window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => {
      this.saveTimer = null;
      void this.plugin.saveSettings();
    }, 800);
  }
};

// src/views/NavigatorView.ts
var import_obsidian6 = require("obsidian");

// src/modals/CreateEntityModal.ts
var import_obsidian3 = require("obsidian");
var CreateEntityModal = class extends import_obsidian3.Modal {
  constructor(app, plugin, opts) {
    super(app);
    this.plugin = plugin;
    this.opts = opts;
  }
  defs() {
    if (this.opts.kind === "categoryItem" && this.opts.categoryId) {
      const cat = this.plugin.store.get(this.opts.categoryId);
      const def = cat == null ? void 0 : cat.categorySchema;
      return {
        icon: (def == null ? void 0 : def.icon) || "\u2B21",
        label: cat ? cat.name : t("schema.categoryItem.label"),
        fields: (def == null ? void 0 : def.fields) || [],
        links: [...SCHEMAS.categoryItem.links, ...(def == null ? void 0 : def.linkDefs) || []]
      };
    }
    const s = SCHEMAS[this.opts.kind];
    return { icon: s.icon, label: t(s.label), fields: s.fields, links: s.links };
  }
  onOpen() {
    var _a;
    const { contentEl } = this;
    const { icon, label, links } = this.defs();
    const fields = this.defs().fields.filter((f) => !f.tab || f.tab === "basic");
    const hidden = /* @__PURE__ */ new Set(["project", "category"]);
    (this.opts.parentLinks || []).forEach((p) => hidden.add(p.key));
    contentEl.addClass("scenarist-modal");
    contentEl.createEl("h2", {
      text: `${icon} ${this.opts.titleHint || t("modal.newEntity", { label })}`,
      cls: "scenarist-modal-title"
    });
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: t("modal.name"), cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: t("modal.namePlaceholder")
    });
    const fieldInputs = {};
    for (const field of fields) {
      if (field.type === "multiselect")
        continue;
      const row = contentEl.createDiv("scenarist-form-row");
      row.createEl("label", { text: t(field.label, void 0, field.label), cls: "scenarist-label" });
      if (field.type === "select" || field.type === "status") {
        const sel = row.createEl("select", { cls: "scenarist-select" });
        if (!field.required)
          sel.createEl("option", { value: "", text: "\u2014" });
        (field.options || []).forEach((o) => sel.createEl("option", { value: o.value, text: o.value }));
        if (field.required && ((_a = field.options) == null ? void 0 : _a.length))
          sel.value = field.options[0].value;
        fieldInputs[field.key] = sel;
      } else if (field.type === "checkbox") {
        const cb = row.createEl("input");
        cb.type = "checkbox";
        fieldInputs[field.key] = cb;
      } else {
        const inp = row.createEl("input", { cls: "scenarist-input" });
        inp.type = field.type === "number" ? "number" : "text";
        fieldInputs[field.key] = inp;
      }
    }
    const linkInputs = {};
    for (const link of links) {
      if (hidden.has(link.key))
        continue;
      const candidates = this.plugin.store.byKind(link.target);
      if (candidates.length === 0)
        continue;
      const row = contentEl.createDiv("scenarist-form-row");
      row.createEl("label", {
        text: t(link.label, void 0, link.label) + (link.single ? "" : t("modal.multipleHint")),
        cls: "scenarist-label"
      });
      const sel = row.createEl("select", { cls: "scenarist-select" });
      sel.multiple = !link.single;
      sel.size = link.single ? 1 : Math.min(4, candidates.length);
      if (link.single)
        sel.createEl("option", { value: "", text: "\u2014" });
      candidates.forEach((c) => sel.createEl("option", { value: c.id, text: c.name }));
      linkInputs[link.key] = sel;
    }
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: t("modal.cancel") }).onclick = () => this.close();
    const createBtn = btns.createEl("button", {
      cls: "scenarist-btn-primary",
      text: t("modal.create")
    });
    createBtn.onclick = async () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.addClass("error");
        return;
      }
      const store = this.plugin.store;
      let entity;
      if (this.opts.kind === "project") {
        entity = store.createProject(name);
      } else if (this.opts.kind === "categoryItem" && this.opts.categoryId) {
        entity = store.createItem(this.opts.categoryId, name);
      } else {
        entity = store.create(this.opts.kind, name);
      }
      for (const p of this.opts.parentLinks || [])
        store.setLink(entity.id, p.key, [p.id]);
      for (const [k, v] of Object.entries(this.opts.presetProps || {}))
        store.setProp(entity.id, k, v);
      for (const field of fields) {
        const el = fieldInputs[field.key];
        if (!el)
          continue;
        if (field.type === "checkbox") {
          store.setProp(entity.id, field.key, el.checked);
        } else if (field.type === "number") {
          const n = parseFloat(el.value);
          if (!isNaN(n))
            store.setProp(entity.id, field.key, n);
        } else if (el.value) {
          store.setProp(entity.id, field.key, el.value);
        }
      }
      for (const link of links) {
        const sel = linkInputs[link.key];
        if (!sel)
          continue;
        const ids = Array.from(sel.selectedOptions).map((o) => o.value).filter(Boolean);
        if (ids.length)
          store.setLink(entity.id, link.key, ids);
      }
      if (this.plugin.settings.autoCreateNotes) {
        await this.plugin.sync.ensureNote(store.get(entity.id));
      }
      this.plugin.navigateTo(entity.id);
      new import_obsidian3.Notice(t("modal.created", { name }));
      this.close();
    };
    nameInput.focus();
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/CreateWorkModal.ts
var import_obsidian4 = require("obsidian");
var CreateWorkModal = class extends import_obsidian4.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("scenarist-modal");
    contentEl.createEl("h2", { text: t("modal.newWork"), cls: "scenarist-modal-title" });
    const fmtRow = contentEl.createDiv("scenarist-form-row");
    fmtRow.createEl("label", { text: t("modal.workFormat"), cls: "scenarist-label" });
    const fmtWrap = fmtRow.createDiv("scenarist-choice");
    let format = "\u0421\u0435\u0440\u0438\u044F";
    const mkChoice = (val, displayLabel, desc) => {
      const b = fmtWrap.createEl("button", { cls: "scenarist-choice-btn", text: "" });
      b.createEl("div", { cls: "scenarist-choice-title", text: displayLabel });
      b.createEl("div", { cls: "scenarist-choice-desc", text: desc });
      if (val === format)
        b.addClass("active");
      b.onclick = () => {
        format = val;
        fmtWrap.querySelectorAll(".scenarist-choice-btn").forEach((e) => e.removeClass("active"));
        b.addClass("active");
      };
    };
    mkChoice("\u0421\u0435\u0440\u0438\u044F", t("modal.series"), t("modal.seriesDesc"));
    mkChoice("\u0412\u0430\u043D\u0448\u043E\u0442", t("modal.oneshot"), t("modal.oneshotDesc"));
    const typeRow = contentEl.createDiv("scenarist-form-row");
    typeRow.createEl("label", { text: t("modal.workType"), cls: "scenarist-label" });
    const typeSel = typeRow.createEl("select", { cls: "scenarist-select" });
    const typeOptions = [
      ["\u0420\u0430\u0441\u0441\u043A\u0430\u0437", t("modal.story")],
      ["\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439", t("modal.script")]
    ];
    typeOptions.forEach(([val, label]) => typeSel.createEl("option", { value: val, text: label }));
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: t("modal.workName"), cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: t("modal.workNamePlaceholder")
    });
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: t("modal.cancel") }).onclick = () => this.close();
    const createBtn = btns.createEl("button", {
      cls: "scenarist-btn-primary",
      text: t("modal.create")
    });
    createBtn.onclick = async () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.addClass("error");
        return;
      }
      const store = this.plugin.store;
      const work = store.create("work", name);
      store.setProp(work.id, "format", format);
      store.setProp(work.id, "type", typeSel.value);
      if (format === "\u0412\u0430\u043D\u0448\u043E\u0442") {
        const book = store.create("book", name);
        store.setLink(book.id, "work", [work.id]);
        if (this.plugin.settings.autoCreateNotes)
          await this.plugin.sync.ensureNote(store.get(book.id));
      }
      if (this.plugin.settings.autoCreateNotes)
        await this.plugin.sync.ensureNote(store.get(work.id));
      this.plugin.navigateTo(work.id);
      new import_obsidian4.Notice(t("modal.workCreated", { name }));
      this.close();
    };
    nameInput.focus();
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/CreateCategoryModal.ts
var import_obsidian5 = require("obsidian");
var CreateCategoryModal = class extends import_obsidian5.Modal {
  constructor(app, plugin, defaultPreset) {
    super(app);
    this.plugin = plugin;
    this.defaultPreset = defaultPreset;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("scenarist-modal");
    const fixedPreset = this.defaultPreset;
    const def = fixedPreset ? CATEGORY_PRESETS[fixedPreset] : null;
    const presetLabel = fixedPreset ? t(PRESET_LABELS[fixedPreset]) : "";
    contentEl.createEl("h2", {
      text: def ? t("modal.newCategoryPreset", { preset: presetLabel }) : t("modal.newCategory"),
      cls: "scenarist-modal-title"
    });
    let preset = fixedPreset || "organization";
    const nameInputHolder = {};
    if (!fixedPreset) {
      const presetRow = contentEl.createDiv("scenarist-form-row");
      presetRow.createEl("label", { text: t("modal.categoryType"), cls: "scenarist-label" });
      const wrap = presetRow.createDiv("scenarist-choice");
      const PRESETS = [
        ["organization", t("modal.presets.organization")],
        ["location", t("modal.presets.location")],
        ["language", t("modal.presets.language")],
        ["custom", t("modal.presets.custom")]
      ];
      const mk = (p, desc) => {
        const pDef = CATEGORY_PRESETS[p];
        const b = wrap.createEl("button", { cls: "scenarist-choice-btn" });
        b.createEl("div", { cls: "scenarist-choice-title", text: `${pDef.icon} ${t(PRESET_LABELS[p])}` });
        b.createEl("div", { cls: "scenarist-choice-desc", text: desc });
        if (p === preset)
          b.addClass("active");
        b.onclick = () => {
          preset = p;
          wrap.querySelectorAll(".scenarist-choice-btn").forEach((e) => e.removeClass("active"));
          b.addClass("active");
          if (nameInputHolder.el && !nameInputHolder.el.value)
            nameInputHolder.el.placeholder = t("modal.categoryNamePlaceholder", { preset: t(PRESET_LABELS[p]) });
        };
      };
      for (const [p, desc] of PRESETS)
        mk(p, desc);
    }
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: t("modal.categoryName"), cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: fixedPreset ? t("modal.categoryNamePlaceholder", { preset: presetLabel }) : t("modal.categoryNameGenericPlaceholder")
    });
    nameInputHolder.el = nameInput;
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: t("modal.cancel") }).onclick = () => this.close();
    const createBtn = btns.createEl("button", {
      cls: "scenarist-btn-primary",
      text: t("modal.create")
    });
    createBtn.onclick = async () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.addClass("error");
        return;
      }
      const cat = this.plugin.store.createCategory(preset, name);
      if (this.plugin.settings.autoCreateNotes)
        await this.plugin.sync.ensureNote(this.plugin.store.get(cat.id));
      this.plugin.navigateTo(cat.id);
      new import_obsidian5.Notice(t("modal.categoryCreated", { name }));
      this.close();
    };
    nameInput.focus();
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/views/NavigatorView.ts
var NAVIGATOR_VIEW = "scenarist-navigator";
var CHAR_ROLES = ["\u0413\u043B\u0430\u0432\u043D\u0430\u044F", "\u041A\u043B\u044E\u0447\u0435\u0432\u0430\u044F", "\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u0430\u044F", "\u042D\u043F\u0438\u0437\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0430\u044F"];
var ENTITY_ICON = {
  work: "pen-line",
  book: "book-open",
  arc: "git-branch",
  anchor: "anchor",
  chapter: "scroll",
  character: "user",
  project: "folder",
  page: "file-text",
  category: "tag",
  categoryItem: "circle-dot"
};
var NavigatorView = class extends import_obsidian6.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this.expanded = /* @__PURE__ */ new Set();
    this.search = "";
    this.tab = "work";
    this.plugin = plugin;
  }
  getViewType() {
    return NAVIGATOR_VIEW;
  }
  getDisplayText() {
    return "Scenarist";
  }
  getIcon() {
    return "film";
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.render()));
    this.unsub.push(this.plugin.onSelect(() => this.render()));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  refresh() {
    this.render();
  }
  get store() {
    return this.plugin.store;
  }
  enabledQuickTypes() {
    return (this.plugin.settings.categoryQuickTypes || []).filter((qt) => qt.enabled);
  }
  resolveTab() {
    const valid = /* @__PURE__ */ new Set(["work", "character", ...this.enabledQuickTypes().map((qt) => qt.id)]);
    if (!valid.has(this.tab))
      this.tab = "work";
  }
  matches(e) {
    return !this.search || e.name.toLowerCase().includes(this.search.toLowerCase());
  }
  isOpen(key) {
    return this.expanded.has(key) || this.search.length > 0;
  }
  toggle(key) {
    if (this.expanded.has(key))
      this.expanded.delete(key);
    else
      this.expanded.add(key);
    this.render();
  }
  // ── Вставить иконку: Lucide-имя или короткий emoji ──────────────────────
  typeIcon(parent, iconOrEmoji) {
    const span = parent.createEl("span", { cls: "scenarist-type-icon" });
    if ([...iconOrEmoji].length <= 2) {
      span.textContent = iconOrEmoji;
    } else {
      (0, import_obsidian6.setIcon)(span, iconOrEmoji);
    }
    return span;
  }
  render() {
    var _a;
    this.resolveTab();
    const searchWasFocused = ((_a = document.activeElement) == null ? void 0 : _a.classList.contains("scenarist-search")) === true;
    const c = this.containerEl.children[1];
    c.empty();
    c.addClass("scenarist-panel", "scenarist-navigator");
    this.renderSearch(c);
    this.renderProjectBar(c);
    this.renderTabs(c);
    const body = c.createDiv("scenarist-nav-body");
    if (this.search.trim()) {
      this.renderAllSearchResults(body);
    } else if (this.tab === "work") {
      this.renderWorkTab(body);
    } else if (this.tab === "character") {
      this.renderCharacterTab(body);
    } else {
      const qt = this.enabledQuickTypes().find((qt2) => qt2.id === this.tab);
      if (qt)
        this.renderCategoryTypeTab(body, qt);
    }
    if (searchWasFocused) {
      const inp = c.querySelector(".scenarist-search");
      if (inp) {
        inp.focus();
        inp.setSelectionRange(inp.value.length, inp.value.length);
      }
    }
  }
  // ── поиск ──────────────────────────────────────────────────────────────────
  renderSearch(c) {
    const wrap = c.createDiv("scenarist-search-wrap");
    const input = wrap.createEl("input", {
      cls: "scenarist-search",
      placeholder: t("nav.search"),
      type: "text"
    });
    input.value = this.search;
    input.oninput = () => {
      this.search = input.value;
      this.render();
    };
  }
  // ── результаты поиска по всем разделам ─────────────────────────────────────
  renderAllSearchResults(body) {
    let totalFound = 0;
    const works = this.store.byKindForProject("work").filter((w) => this.workHasMatch(w));
    if (works.length > 0) {
      this.searchSectionTitle(body, t("nav.works"));
      for (const work of works)
        this.renderWorkBlock(body, work);
      totalFound += works.length;
    }
    const chars = this.store.byKindForProject("character").filter((c) => this.matches(c));
    if (chars.length > 0) {
      this.searchSectionTitle(body, t("nav.characters"));
      const pills = body.createDiv("scenarist-pills");
      pills.style.paddingLeft = "12px";
      for (const ch of chars)
        this.renderPill(pills, ch);
      totalFound += chars.length;
    }
    for (const qt of this.enabledQuickTypes()) {
      const cats = this.store.byKindForProject("category").filter((c) => {
        var _a;
        return ((_a = c.categorySchema) == null ? void 0 : _a.preset) === qt.preset;
      });
      const matching = cats.filter(
        (cat) => this.matches(cat) || this.store.categoryItems(cat.id).some((i) => this.matches(i))
      );
      if (matching.length > 0) {
        this.searchSectionTitle(body, qt.label);
        for (const cat of matching) {
          const items = this.store.categoryItems(cat.id).filter((i) => this.matches(i));
          this.chipGroup(
            body,
            `cat:${cat.id}`,
            qt.icon,
            cat.name,
            items,
            () => new CreateEntityModal(this.app, this.plugin, {
              kind: "categoryItem",
              categoryId: cat.id,
              titleHint: t("nav.newWork", { name: cat.name })
            }).open(),
            () => this.plugin.navigateTo(cat.id),
            cat
          );
        }
        totalFound += matching.length;
      }
    }
    if (totalFound === 0) {
      body.createDiv("scenarist-tree-empty").setText(t("nav.nothingFound"));
    }
  }
  searchSectionTitle(parent, text) {
    parent.createDiv("scenarist-search-section").setText(text);
  }
  // ── проектная панель ───────────────────────────────────────────────────────
  renderProjectBar(c) {
    const bar = c.createDiv("scenarist-projbar");
    const gear = bar.createEl("button", { cls: "clickable-icon scenarist-proj-settings" });
    (0, import_obsidian6.setIcon)(gear, "settings");
    gear.setAttribute("aria-label", t("nav.openSettings"));
    gear.onclick = () => {
      const setting = this.app.setting;
      if (setting) {
        setting.open();
        setting.openTabById(this.plugin.manifest.id);
      }
    };
    const sel = bar.createEl("select", { cls: "scenarist-work-select" });
    const none = sel.createEl("option", { value: NO_PROJECT, text: t("nav.noProject") });
    if (this.store.getActiveProjectId() === NO_PROJECT)
      none.selected = true;
    this.store.getProjects().forEach((p) => {
      const o = sel.createEl("option", { value: p.id, text: p.name });
      if (p.id === this.store.getActiveProjectId())
        o.selected = true;
    });
    sel.onchange = () => this.store.setActiveProject(sel.value);
    const add = bar.createEl("button", { cls: "clickable-icon scenarist-proj-add" });
    (0, import_obsidian6.setIcon)(add, "plus");
    add.setAttribute("aria-label", t("nav.createProject"));
    add.onclick = () => new CreateEntityModal(this.app, this.plugin, {
      kind: "project",
      titleHint: t("nav.newProject")
    }).open();
  }
  // ── вкладки ────────────────────────────────────────────────────────────────
  renderTabs(c) {
    const row = c.createDiv("scenarist-tabs-icons");
    this.makeTabBtn(row, "work", "palette", t("nav.works"));
    this.makeTabBtn(row, "character", "user", t("nav.characters"));
    for (const qt of this.enabledQuickTypes()) {
      this.makeTabBtn(row, qt.id, qt.icon, qt.label);
    }
  }
  makeTabBtn(row, id, icon, title) {
    const b = row.createEl("button", {
      cls: `clickable-icon scenarist-tab-icon${this.tab === id ? " is-active" : ""}`,
      attr: { "aria-label": title, title }
    });
    if ([...icon].length <= 2) {
      b.textContent = icon;
      b.style.fontSize = "15px";
    } else {
      (0, import_obsidian6.setIcon)(b, icon);
    }
    b.onclick = () => {
      this.tab = id;
      this.render();
    };
  }
  // ── вкладка: Произведения ──────────────────────────────────────────────────
  renderWorkTab(body) {
    this.tabHeader(
      body,
      t("nav.works"),
      () => new CreateWorkModal(this.app, this.plugin).open(),
      t("nav.createWork")
    );
    const works = this.store.byKindForProject("work");
    if (works.length === 0) {
      body.createDiv("scenarist-tree-empty").setText(t("nav.noWorks"));
      return;
    }
    for (const work of works)
      this.renderWorkBlock(body, work);
  }
  workHasMatch(work) {
    if (this.matches(work))
      return true;
    for (const b of this.linked(work, "books", "book")) {
      if (this.matches(b))
        return true;
      if (this.linked(b, "chapters", "chapter").some((c) => this.matches(c)))
        return true;
    }
    if (this.linked(work, "arcs", "arc").some((a) => this.matches(a)))
      return true;
    if (this.linked(work, "anchors", "anchor").some((a) => this.matches(a)))
      return true;
    return false;
  }
  renderWorkBlock(body, work) {
    const key = `w:${work.id}`;
    const open = this.isOpen(key);
    const head = body.createDiv("scenarist-work-head");
    head.createEl("span", { cls: "scenarist-chevron", text: open ? "\u25BE" : "\u25B8" });
    this.typeIcon(head, ENTITY_ICON.work);
    const title = head.createEl("span", { cls: "scenarist-work-title", text: work.name });
    title.onclick = (e) => {
      e.stopPropagation();
      this.plugin.navigateTo(work.id);
    };
    const tl = head.createEl("button", { cls: "clickable-icon" });
    (0, import_obsidian6.setIcon)(tl, "clock");
    tl.setAttribute("aria-label", t("nav.timeline"));
    tl.onclick = (e) => {
      e.stopPropagation();
      this.plugin.openTimeline(work.id);
    };
    const addBtn = head.createEl("button", { cls: "clickable-icon" });
    (0, import_obsidian6.setIcon)(addBtn, "plus");
    addBtn.setAttribute("aria-label", t("nav.add"));
    addBtn.onclick = (e) => {
      e.stopPropagation();
      this.workAddMenu(e, work);
    };
    head.onclick = () => this.toggle(key);
    head.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.contextMenu(e, work);
    });
    if (!open)
      return;
    const inner = body.createDiv("scenarist-work-inner");
    for (const b of this.linked(work, "books", "book")) {
      const chapters = this.linked(b, "chapters", "chapter").filter((c) => this.matches(c));
      this.chipGroup(
        inner,
        `b:${b.id}`,
        ENTITY_ICON.book,
        b.name,
        chapters,
        () => new CreateEntityModal(this.app, this.plugin, {
          kind: "chapter",
          parentLinks: [{ key: "book", id: b.id }],
          titleHint: t("nav.newChapter")
        }).open(),
        void 0,
        b
      );
    }
    const arcs = this.linked(work, "arcs", "arc").filter((a) => this.matches(a));
    this.chipGroup(
      inner,
      `arcs:${work.id}`,
      ENTITY_ICON.arc,
      t("nav.arcs"),
      arcs,
      () => new CreateEntityModal(this.app, this.plugin, {
        kind: "arc",
        parentLinks: [{ key: "work", id: work.id }],
        titleHint: t("nav.newArc")
      }).open()
    );
    const anchors = this.linked(work, "anchors", "anchor").filter((a) => this.matches(a));
    this.chipGroup(
      inner,
      `anch:${work.id}`,
      ENTITY_ICON.anchor,
      t("nav.anchors"),
      anchors,
      () => new CreateEntityModal(this.app, this.plugin, {
        kind: "anchor",
        parentLinks: [{ key: "work", id: work.id }],
        titleHint: t("nav.newAnchor")
      }).open()
    );
  }
  // ── вкладка: Персонажи ─────────────────────────────────────────────────────
  renderCharacterTab(body) {
    this.tabHeader(
      body,
      t("nav.characters"),
      () => new CreateEntityModal(this.app, this.plugin, { kind: "character" }).open(),
      t("nav.createCharacter")
    );
    const chars = this.store.byKindForProject("character");
    for (const role of CHAR_ROLES) {
      const inRole = chars.filter((c) => c.props["role"] === role);
      this.chipGroup(
        body,
        `role:${role}`,
        ENTITY_ICON.character,
        role,
        inRole,
        () => new CreateEntityModal(this.app, this.plugin, {
          kind: "character",
          presetProps: { role },
          titleHint: t("nav.newWork", { name: role.toLowerCase() })
        }).open()
      );
    }
    const noRole = chars.filter((c) => !CHAR_ROLES.includes(String(c.props["role"])));
    if (noRole.length > 0) {
      this.chipGroup(
        body,
        "role:none",
        ENTITY_ICON.character,
        t("nav.noRole"),
        noRole,
        () => new CreateEntityModal(this.app, this.plugin, { kind: "character" }).open()
      );
    }
  }
  // ── вкладка: тип категории ─────────────────────────────────────────────────
  renderCategoryTypeTab(body, qt) {
    this.tabHeader(
      body,
      qt.label,
      () => new CreateCategoryModal(this.app, this.plugin, qt.preset).open(),
      t("nav.createFor", { label: qt.label })
    );
    const cats = this.store.byKindForProject("category").filter((c) => {
      var _a;
      return ((_a = c.categorySchema) == null ? void 0 : _a.preset) === qt.preset;
    });
    if (cats.length === 0) {
      body.createDiv("scenarist-tree-empty").setText(t("nav.noItems", { label: qt.label.toLowerCase() }));
      return;
    }
    for (const cat of cats) {
      const items = this.store.categoryItems(cat.id);
      this.chipGroup(
        body,
        `cat:${cat.id}`,
        qt.icon,
        cat.name,
        items,
        () => new CreateEntityModal(this.app, this.plugin, {
          kind: "categoryItem",
          categoryId: cat.id,
          titleHint: t("nav.newWork", { name: cat.name })
        }).open(),
        () => this.plugin.navigateTo(cat.id),
        cat
      );
    }
  }
  // ── общие ──────────────────────────────────────────────────────────────────
  tabHeader(body, title, onAdd, addLabel) {
    const head = body.createDiv("scenarist-tab-head");
    head.createEl("span", { cls: "scenarist-tab-title", text: title });
    const add = head.createEl("button", { cls: "clickable-icon" });
    (0, import_obsidian6.setIcon)(add, "plus");
    add.setAttribute("aria-label", addLabel);
    add.onclick = onAdd;
  }
  chipGroup(parent, key, icon, title, items, onAdd, onTitleClick, headerEntity) {
    const open = this.isOpen(key);
    const head = parent.createDiv("scenarist-group-header");
    head.createEl("span", { cls: "scenarist-chevron", text: open ? "\u25BE" : "\u25B8" });
    this.typeIcon(head, icon);
    const titleEl = head.createEl("span", { cls: "scenarist-group-title", text: title });
    head.createEl("span", { cls: "scenarist-count-badge", text: String(items.length) });
    if (onTitleClick) {
      titleEl.addClass("linkable");
      titleEl.onclick = (e) => {
        e.stopPropagation();
        onTitleClick();
      };
    }
    head.onclick = () => this.toggle(key);
    if (headerEntity) {
      head.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.contextMenu(e, headerEntity);
      });
    }
    if (!open)
      return;
    const pills = parent.createDiv("scenarist-pills");
    for (const item of items)
      this.renderPill(pills, item);
    const add = pills.createEl("button", { cls: "scenarist-pill add" });
    (0, import_obsidian6.setIcon)(add, "plus");
    add.setAttribute("aria-label", t("nav.add"));
    add.onclick = onAdd;
  }
  renderPill(parent, entity) {
    var _a, _b;
    const pill = parent.createEl("button", { cls: "scenarist-pill" });
    if (this.plugin.selectedId === entity.id)
      pill.addClass("selected");
    if (entity.kind === "chapter") {
      const opt = (_b = (_a = SCHEMAS.chapter.fields.find((f) => f.key === "status")) == null ? void 0 : _a.options) == null ? void 0 : _b.find((o) => o.value === entity.props["status"]);
      const dot = pill.createEl("span", { cls: "scenarist-pill-dot" });
      dot.style.background = opt ? opt.color : "#555";
    }
    pill.createEl("span", { text: entity.name });
    pill.onclick = () => this.plugin.navigateTo(entity.id);
    pill.addEventListener("dblclick", () => this.plugin.sync.openNote(entity));
    pill.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.contextMenu(e, entity);
    });
  }
  // ── хелперы ────────────────────────────────────────────────────────────────
  linked(e, key, kind) {
    return (e.links[key] || []).map((id) => this.store.get(id)).filter((x) => !!x && x.kind === kind);
  }
  workAddMenu(e, work) {
    const menu = new import_obsidian6.Menu();
    const mk = (label, stored, kind, icon) => menu.addItem(
      (i) => i.setTitle(label).setIcon(icon).onClick(
        () => new CreateEntityModal(this.app, this.plugin, {
          kind,
          parentLinks: [{ key: "work", id: work.id }],
          titleHint: t("nav.newWork", { name: stored })
        }).open()
      )
    );
    mk(t("nav.book"), t("nav.book"), "book", "book-open");
    mk(t("nav.arc"), t("nav.arc"), "arc", "git-branch");
    mk(t("nav.anchor"), t("nav.anchor"), "anchor", "anchor");
    menu.showAtMouseEvent(e);
  }
  contextMenu(e, entity) {
    const menu = new import_obsidian6.Menu();
    menu.addItem(
      (i) => i.setTitle(t("nav.openCard")).setIcon("info").onClick(() => this.plugin.navigateTo(entity.id))
    );
    menu.addItem(
      (i) => i.setTitle(t("nav.openNote")).setIcon("file-text").onClick(() => this.plugin.sync.openNote(entity))
    );
    menu.addSeparator();
    menu.addItem(
      (i) => i.setTitle(t("nav.delete")).setIcon("trash").onClick(async () => {
        await this.plugin.sync.deleteEntity(entity.id);
        new import_obsidian6.Notice(t("nav.deleted", { name: entity.name }));
      })
    );
    menu.showAtMouseEvent(e);
  }
};

// src/views/CardView.ts
var import_obsidian7 = require("obsidian");
var CARD_VIEW = "scenarist-card";
var ENTITY_FILE_VIEW = "scenarist-entity-file";
var STRUCTURAL = /* @__PURE__ */ new Set(["project", "category"]);
var LONG_FIELDS = /* @__PURE__ */ new Set(["summary", "synopsis", "description", "idea", "goal"]);
var CardView = class extends import_obsidian7.FileView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this._rendering = false;
    this._renderPending = false;
    this._charTab = "basic";
    /** Если задан — вкладка закреплена за конкретной сущностью (не следит за навигатором). */
    this.pinnedId = null;
    this.plugin = plugin;
  }
  getViewType() {
    return CARD_VIEW;
  }
  getDisplayText() {
    var _a;
    return ((_a = this.current()) == null ? void 0 : _a.name) || "Scenarist";
  }
  getIcon() {
    return "film";
  }
  getState() {
    return { pinnedId: this.pinnedId };
  }
  async setState(state) {
    this.pinnedId = (state == null ? void 0 : state.pinnedId) || null;
    this._charTab = "basic";
    await this.render();
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.scheduleRender()));
    this.unsub.push(this.plugin.onSelect(() => {
      if (!this.pinnedId)
        this.scheduleRender();
    }));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  refresh() {
    this.render();
  }
  /** Debounced re-entrant-safe render scheduler. */
  scheduleRender() {
    if (this._rendering) {
      this._renderPending = true;
      return;
    }
    this.render();
  }
  current() {
    var _a;
    const id = (_a = this.pinnedId) != null ? _a : this.plugin.selectedId;
    return id ? this.plugin.store.get(id) : null;
  }
  single(ids) {
    if (!ids || !ids.length)
      return null;
    return this.plugin.store.get(ids[0]);
  }
  // ── Render Lucide icon or emoji into element ─────────────────────────────
  renderIconInto(el, iconStr) {
    if ([...iconStr].length <= 2) {
      el.textContent = iconStr;
    } else {
      (0, import_obsidian7.setIcon)(el, iconStr);
    }
  }
  async render() {
    if (this._rendering) {
      this._renderPending = true;
      return;
    }
    this._rendering = true;
    try {
      const root = this.containerEl.children[1];
      root.empty();
      root.addClass("scenarist-card-view");
      const entity = this.current();
      if (!entity) {
        const empty = root.createDiv("scenarist-empty");
        const iconBox = empty.createDiv("scenarist-empty-icon");
        (0, import_obsidian7.setIcon)(iconBox, "layers");
        empty.createEl("p", { text: t("card.empty") });
        empty.createEl("p", {
          cls: "scenarist-empty-hint",
          text: t("card.emptyHint")
        });
        return;
      }
      const card = root.createDiv("scenarist-card");
      this.renderHeader(card, entity);
      if (entity.kind === "character") {
        await this.renderCharacterTabs(card, entity);
      } else {
        this.renderProps(card, entity);
        if (entity.kind === "category")
          this.renderCategoryItems(card, entity);
        this.renderRelations(card, entity);
        await this.renderBody(card, entity);
      }
    } finally {
      this._rendering = false;
      if (this._renderPending) {
        this._renderPending = false;
        setTimeout(() => this.render(), 0);
      }
    }
  }
  // ---- шапка + крошки ----
  parentOf(e) {
    switch (e.kind) {
      case "page":
        return this.single(e.links["chapter"]);
      case "chapter":
        return this.single(e.links["book"]);
      case "book":
      case "arc":
      case "anchor":
        return this.single(e.links["work"]);
      case "categoryItem":
        return this.single(e.links["category"]);
      case "work":
      case "character":
      case "category":
        return this.single(e.links["project"]);
      default:
        return null;
    }
  }
  renderHeader(card, entity) {
    const schema = this.plugin.store.resolved(entity);
    const top = card.createDiv("scenarist-card-top");
    if (this.plugin.canGoBack()) {
      const back = top.createEl("button", { cls: "scenarist-card-back", attr: { title: t("card.back") } });
      (0, import_obsidian7.setIcon)(back, "arrow-left");
      back.onclick = () => this.plugin.back();
    }
    const crumbs = [];
    let p = this.parentOf(entity);
    let guard = 0;
    while (p && guard++ < 8) {
      crumbs.unshift(p);
      p = this.parentOf(p);
    }
    const trail = top.createDiv("scenarist-crumbs");
    crumbs.forEach((cr) => {
      const crSchema = this.plugin.store.resolved(cr);
      const a = trail.createEl("span", { cls: "scenarist-crumb" });
      const iconSpan = a.createEl("span", { cls: "scenarist-crumb-icon" });
      this.renderIconInto(iconSpan, crSchema.icon);
      a.createEl("span", { text: cr.name });
      a.onclick = () => this.plugin.navigateTo(cr.id);
      trail.createEl("span", { cls: "scenarist-crumb-sep", text: "/" });
    });
    trail.createEl("span", { cls: "scenarist-crumb current", text: t(schema.label, void 0, schema.label) });
    const spacer = top.createDiv();
    spacer.style.flex = "1";
    const openBtn = top.createEl("button", { cls: "scenarist-card-note-btn", attr: { title: t("card.openNote") } });
    (0, import_obsidian7.setIcon)(openBtn, "external-link");
    openBtn.createEl("span", { text: t("card.noteLabel") });
    openBtn.onclick = () => this.plugin.sync.openNote(entity);
    const titleRow = card.createDiv("scenarist-card-titlerow");
    const iconBox = titleRow.createEl("span", { cls: "scenarist-card-icon" });
    this.renderIconInto(iconBox, schema.icon);
    const title = titleRow.createEl("input", { cls: "scenarist-card-title" });
    title.value = entity.name;
    title.placeholder = t("card.noName");
    title.onchange = () => {
      const v = title.value.trim();
      if (v && v !== entity.name) {
        this.plugin.store.rename(entity.id, v);
        this.plugin.sync.syncToNote(this.plugin.store.get(entity.id));
      }
    };
    if (entity.kind === "character") {
      titleRow.addClass("has-avatar");
      this.renderAvatarBox(titleRow, entity);
    }
    if (entity.kind !== "character") {
      this.renderTagsHeader(card, entity);
    }
  }
  /** Строка тегов под заголовком. */
  renderTagsHeader(card, entity) {
    const rawTags = entity.props["tags"];
    const tags = rawTags ? String(rawTags).split(",").map((tg) => tg.trim()).filter(Boolean) : [];
    const row = card.createDiv("scenarist-card-tags");
    for (const tag of tags) {
      const chip = row.createEl("span", { cls: "scenarist-tag-chip" });
      const text = chip.createEl("span", { cls: "scenarist-tag-chip-text", text: "#" + tag });
      text.title = t("card.findTag", { tag });
      text.onclick = (e) => {
        e.stopPropagation();
        this.openTagSearch(tag);
      };
      const x = chip.createEl("span", { cls: "scenarist-tag-chip-x", text: "\xD7" });
      x.title = t("card.removeTag");
      x.onclick = (e) => {
        e.stopPropagation();
        const next = tags.filter((tg) => tg !== tag);
        this.commitProp(entity, "tags", next.length ? next.join(", ") : null);
      };
    }
    const addBtn = row.createEl("button", { cls: "scenarist-tag-add", text: t("card.addTag") });
    addBtn.onclick = () => {
      addBtn.style.display = "none";
      const inp = row.createEl("input", { cls: "scenarist-tag-input" });
      inp.placeholder = t("card.tagPlaceholder");
      inp.focus();
      const commit = () => {
        const val = inp.value.trim().replace(/^#/, "");
        if (val && !tags.includes(val)) {
          this.commitProp(entity, "tags", [...tags, val].join(", "));
        }
      };
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          commit();
        }
        if (e.key === "Escape") {
          inp.remove();
          addBtn.style.display = "";
        }
      });
      inp.addEventListener("blur", commit);
    };
  }
  // ---- свойства ----
  renderProps(card, entity) {
    const fields = this.plugin.store.resolved(entity).fields;
    const section = card.createDiv("scenarist-card-section");
    for (const field of fields) {
      const row = section.createDiv("scenarist-prop");
      row.createEl("div", { cls: "scenarist-prop-label", text: t(field.label, void 0, field.label) });
      const valWrap = row.createDiv("scenarist-prop-value");
      this.renderFieldControl(valWrap, entity, field);
    }
    this.renderBacklinksProp(section, entity);
  }
  /** Поле ссылок на заметки — чипы. */
  renderBacklinksProp(section, entity) {
    const rawVal = entity.props["backlinks"] ? String(entity.props["backlinks"]) : "";
    const links = [];
    const re = /\[\[([^\]]+)\]\]/g;
    let m;
    while ((m = re.exec(rawVal)) !== null)
      links.push(m[1]);
    const row = section.createDiv("scenarist-prop");
    row.createEl("div", { cls: "scenarist-prop-label", text: t("card.noteLinks") });
    const valWrap = row.createDiv("scenarist-prop-value");
    const chipRow = valWrap.createDiv("scenarist-card-tags scenarist-link-chips");
    chipRow.style.margin = "0";
    const commitLinks = (newLinks) => {
      const val = newLinks.length ? newLinks.map((l) => `[[${l}]]`).join(", ") : null;
      this.commitProp(entity, "backlinks", val);
    };
    for (const link of links) {
      const chip = chipRow.createEl("span", { cls: "scenarist-link-chip" });
      const text = chip.createEl("span", { cls: "scenarist-tag-chip-text", text: `[[${link}]]` });
      text.title = t("card.openLink", { link });
      text.onclick = (e) => {
        e.stopPropagation();
        this.openObsidianLink(link);
      };
      const x = chip.createEl("span", { cls: "scenarist-tag-chip-x", text: "\xD7" });
      x.onclick = (e) => {
        e.stopPropagation();
        commitLinks(links.filter((l) => l !== link));
      };
    }
    const addBtn = chipRow.createEl("button", { cls: "scenarist-tag-add", text: t("card.addLink") });
    addBtn.onclick = () => {
      addBtn.style.display = "none";
      const inp = chipRow.createEl("input", { cls: "scenarist-tag-input" });
      inp.placeholder = t("card.linkPlaceholder");
      inp.style.width = "160px";
      inp.focus();
      const commit = () => {
        const val = inp.value.trim().replace(/^\[\[|\]\]$/g, "");
        if (val && !links.includes(val))
          commitLinks([...links, val]);
      };
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
          commit();
        if (e.key === "Escape") {
          inp.remove();
          addBtn.style.display = "";
        }
      });
      inp.addEventListener("blur", commit);
    };
  }
  /** Открыть wikilink через Obsidian. */
  openObsidianLink(linkText) {
    this.app.workspace.openLinkText(linkText, "", false);
  }
  renderFieldControl(wrap, entity, field) {
    var _a, _b;
    const val = entity.props[field.key];
    if (field.type === "multiselect") {
      const selected = val ? String(val).split(",").map((v) => v.trim()).filter(Boolean) : [];
      const settingsOpts = ((_a = this.plugin.settings.genreOptions) == null ? void 0 : _a.length) ? this.plugin.settings.genreOptions : (field.options || []).map((o) => o.value);
      const optMap = new Map((field.options || []).map((o) => [o.value, o.color]));
      const chipRow = wrap.createDiv("scenarist-card-tags scenarist-genre-chips");
      chipRow.style.margin = "0";
      const commitGenres = (next) => this.commitProp(entity, field.key, next.length ? next.join(", ") : null);
      const renderChips = () => {
        chipRow.empty();
        for (const v of selected) {
          const color = optMap.get(v) || "#888";
          const chip = chipRow.createEl("span", { cls: "scenarist-genre-chip" });
          chip.style.setProperty("--chip-color", color);
          chip.createEl("span", { text: v });
          const x = chip.createEl("span", { cls: "scenarist-tag-chip-x", text: "\xD7" });
          x.onclick = () => commitGenres(selected.filter((s) => s !== v));
        }
        const available = settingsOpts.filter((o) => !selected.includes(o));
        const sel = chipRow.createEl("select", { cls: "scenarist-genre-add" });
        sel.createEl("option", { value: "", text: t("card.addGenre") });
        available.forEach((o) => sel.createEl("option", { value: o, text: o }));
        sel.createEl("option", { value: "__new__", text: t("card.addNewGenre") });
        sel.onchange = async () => {
          if (!sel.value)
            return;
          if (sel.value === "__new__") {
            sel.style.display = "none";
            const inp = chipRow.createEl("input", { cls: "scenarist-tag-input" });
            inp.placeholder = t("card.newGenrePlaceholder");
            inp.focus();
            const doAdd = async () => {
              const newG = inp.value.trim();
              if (newG) {
                if (!this.plugin.settings.genreOptions.includes(newG)) {
                  this.plugin.settings.genreOptions.push(newG);
                  await this.plugin.saveSettings();
                }
                if (!selected.includes(newG)) {
                  selected.push(newG);
                  optMap.set(newG, "#888");
                  commitGenres(selected);
                }
              } else {
                sel.value = "";
                sel.style.display = "";
                renderChips();
              }
            };
            inp.addEventListener("keydown", (e) => {
              if (e.key === "Enter") {
                doAdd();
              }
              if (e.key === "Escape") {
                inp.remove();
                sel.style.display = "";
                sel.value = "";
              }
            });
            inp.addEventListener("blur", doAdd);
          } else {
            selected.push(sel.value);
            commitGenres(selected);
          }
        };
      };
      renderChips();
      return;
    }
    if (field.type === "select" || field.type === "status") {
      const selWrap = wrap.createDiv("scenarist-select-wrap");
      const dot = selWrap.createDiv("scenarist-select-dot");
      const sel = selWrap.createEl("select", { cls: "scenarist-prop-select" });
      (field.options || []).forEach((o) => {
        const opt = sel.createEl("option", { value: o.value, text: o.value });
        if (o.value === val)
          opt.selected = true;
      });
      if (!val && ((_b = field.options) == null ? void 0 : _b.length)) {
        sel.value = field.options[0].value;
        queueMicrotask(() => this.commitProp(entity, field.key, field.options[0].value));
      }
      const updateDot = () => {
        const opt = (field.options || []).find((o) => o.value === sel.value);
        if (opt) {
          dot.style.background = opt.color;
          dot.style.opacity = "1";
        } else {
          dot.style.background = "transparent";
          dot.style.opacity = "0";
        }
      };
      updateDot();
      sel.onchange = () => {
        updateDot();
        this.commitProp(entity, field.key, sel.value || null);
      };
      return;
    }
    if (field.type === "checkbox") {
      const cb = wrap.createEl("input", { cls: "scenarist-prop-check" });
      cb.type = "checkbox";
      cb.checked = val === true;
      cb.onchange = () => this.commitProp(entity, field.key, cb.checked);
      return;
    }
    if (field.type === "number") {
      const inp = wrap.createEl("input", { cls: "scenarist-prop-input" });
      inp.type = "number";
      inp.value = val !== null && val !== void 0 ? String(val) : "";
      inp.onchange = () => {
        const n = parseFloat(inp.value);
        this.commitProp(entity, field.key, isNaN(n) ? null : n);
      };
      return;
    }
    const ta = wrap.createEl("textarea", { cls: "scenarist-prop-textarea" });
    ta.value = val !== null && val !== void 0 ? String(val) : "";
    ta.placeholder = "\u2014";
    ta.rows = LONG_FIELDS.has(field.key) ? 3 : 1;
    this.autoGrow(ta);
    ta.oninput = () => this.autoGrow(ta);
    ta.onchange = () => this.commitProp(entity, field.key, ta.value || null);
  }
  autoGrow(ta) {
    ta.style.height = "auto";
    const minLines = ta.rows || 1;
    const lineH = 22;
    ta.style.height = Math.max(ta.scrollHeight, minLines * lineH) + "px";
  }
  commitProp(entity, key, value) {
    this.plugin.store.setProp(entity.id, key, value);
    this.plugin.sync.syncToNote(this.plugin.store.get(entity.id));
  }
  // ---- элементы категории ----
  renderCategoryItems(card, cat) {
    const items = this.plugin.store.categoryItems(cat.id);
    const section = card.createDiv("scenarist-card-section");
    const head = section.createDiv("scenarist-card-body-head");
    head.createEl("div", { cls: "scenarist-card-section-title", text: t("card.items", { count: items.length }) });
    const add = head.createEl("button", { cls: "scenarist-card-edit-btn", text: t("card.addItem") });
    add.onclick = () => new CreateEntityModal(this.app, this.plugin, {
      kind: "categoryItem",
      categoryId: cat.id,
      titleHint: t("modal.newEntity", { label: cat.name })
    }).open();
    const chips = section.createDiv("scenarist-rel-chips");
    if (items.length === 0) {
      chips.createEl("span", { cls: "scenarist-muted", text: t("card.emptyItems") });
    }
    for (const it of items) {
      const chip = chips.createEl("span", { cls: "scenarist-rel-chip" });
      const chipIcon = chip.createEl("span", { cls: "scenarist-rel-chip-icon" });
      this.renderIconInto(chipIcon, this.plugin.store.resolved(it).icon);
      chip.createEl("span", { text: it.name });
      chip.onclick = () => this.plugin.navigateTo(it.id);
    }
  }
  // ---- связи ----
  renderRelations(card, entity) {
    const schema = this.plugin.store.resolved(entity);
    const linkKeys = new Set(schema.links.map((l) => l.key));
    const section = card.createDiv("scenarist-card-section");
    section.createEl("div", { cls: "scenarist-card-section-title", text: t("card.relations") });
    const blocks = [];
    for (const link of schema.links) {
      if (STRUCTURAL.has(link.key))
        continue;
      const el = this.renderLinkEditor(
        entity,
        link.key,
        t(link.label, void 0, link.label),
        link.target,
        !!link.single
      );
      if (el) {
        section.appendChild(el);
        blocks.push(el);
      }
    }
    for (const key of Object.keys(entity.links)) {
      if (linkKeys.has(key) || STRUCTURAL.has(key))
        continue;
      const ids = entity.links[key];
      if (!ids || !ids.length)
        continue;
      const el = this.renderBacklinks(key, ids);
      section.appendChild(el);
      blocks.push(el);
    }
    if (blocks.length === 0)
      section.remove();
  }
  renderLinkEditor(entity, key, label, target, single) {
    const current = entity.links[key] || [];
    const candidates = this.plugin.store.byKind(target).filter((c) => c.id !== entity.id && !current.includes(c.id));
    if (current.length === 0 && candidates.length === 0)
      return null;
    const wrap = document.createElement("div");
    wrap.className = "scenarist-rel-group";
    const lbl = wrap.createDiv("scenarist-rel-label");
    lbl.textContent = label;
    const chips = wrap.createDiv("scenarist-rel-chips");
    for (const tid of current) {
      const target_entity = this.plugin.store.get(tid);
      if (!target_entity)
        continue;
      const chip = chips.createEl("span", { cls: "scenarist-rel-chip" });
      const chipIcon = chip.createEl("span", { cls: "scenarist-rel-chip-icon" });
      this.renderIconInto(chipIcon, this.plugin.store.resolved(target_entity).icon);
      chip.createEl("span", { text: target_entity.name });
      chip.onclick = () => this.plugin.navigateTo(tid);
      const x = chip.createEl("span", { cls: "scenarist-rel-x", text: "\xD7" });
      x.onclick = (e) => {
        e.stopPropagation();
        this.plugin.store.setLink(
          entity.id,
          key,
          current.filter((c) => c !== tid)
        );
        this.plugin.sync.syncToNote(this.plugin.store.get(entity.id));
      };
    }
    if (candidates.length > 0) {
      const sel = chips.createEl("select", { cls: "scenarist-rel-add" });
      sel.createEl("option", { value: "", text: t("card.addRelation") });
      candidates.forEach((c) => sel.createEl("option", { value: c.id, text: c.name }));
      sel.onchange = () => {
        if (!sel.value)
          return;
        const next = single ? [sel.value] : [...current, sel.value];
        this.plugin.store.setLink(entity.id, key, next);
        this.plugin.sync.syncToNote(this.plugin.store.get(entity.id));
      };
    }
    return wrap;
  }
  renderBacklinks(key, ids) {
    const wrap = document.createElement("div");
    wrap.className = "scenarist-rel-group backlinks";
    wrap.createDiv("scenarist-rel-label").textContent = t("card.backlinks." + key, void 0, key);
    const chips = wrap.createDiv("scenarist-rel-chips");
    for (const id of ids) {
      const entity = this.plugin.store.get(id);
      if (!entity)
        continue;
      const chip = chips.createEl("span", { cls: "scenarist-rel-chip readonly" });
      const chipIcon = chip.createEl("span", { cls: "scenarist-rel-chip-icon" });
      this.renderIconInto(chipIcon, this.plugin.store.resolved(entity).icon);
      chip.createEl("span", { text: entity.name });
      chip.onclick = () => this.plugin.navigateTo(id);
    }
    return wrap;
  }
  // ---- аватар персонажа ----
  renderAvatarBox(titleRow, entity) {
    const avatarVal = entity.props["avatar"] ? String(entity.props["avatar"]) : null;
    const box = titleRow.createDiv("scenarist-char-avatar");
    if (avatarVal) {
      const file = this.plugin.app.vault.getAbstractFileByPath(avatarVal);
      if (file instanceof import_obsidian7.TFile) {
        const url = this.plugin.app.vault.getResourcePath(file);
        box.createEl("img", { cls: "scenarist-char-avatar-img", attr: { src: url, alt: entity.name } });
        const del = box.createDiv("scenarist-char-avatar-del");
        (0, import_obsidian7.setIcon)(del, "x");
        del.title = t("card.avatar.remove");
        del.onclick = (e) => {
          e.stopPropagation();
          this.commitProp(entity, "avatar", null);
        };
      } else {
        this.renderAvatarPlaceholder(box);
      }
    } else {
      this.renderAvatarPlaceholder(box);
    }
    box.title = t("card.avatar.tooltip");
    box.onclick = (e) => {
      if (e.target.closest(".scenarist-char-avatar-del"))
        return;
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        var _a;
        const file = (_a = input.files) == null ? void 0 : _a[0];
        if (!file)
          return;
        const path = await this.saveImageToVault(entity, file, "avatar");
        if (path)
          this.commitProp(entity, "avatar", path);
      };
      input.click();
    };
  }
  renderAvatarPlaceholder(box) {
    const ph = box.createDiv("scenarist-char-avatar-ph");
    (0, import_obsidian7.setIcon)(ph, "image");
    box.createEl("span", { cls: "scenarist-char-avatar-hint", text: t("card.avatar.set") });
  }
  // ---- сохранение изображения в vault ----
  getAssetsFolder(entity) {
    const dir = entity.filePath.includes("/") ? entity.filePath.substring(0, entity.filePath.lastIndexOf("/")) : "";
    return dir ? `${dir}/assets` : "assets";
  }
  nameSlug(entity) {
    return entity.name.replace(/[/\\:*?"<>|]/g, "").replace(/\s+/g, "_");
  }
  async saveImageToVault(entity, file, type) {
    if (!entity.filePath)
      return null;
    try {
      const assets = this.getAssetsFolder(entity);
      if (!this.plugin.app.vault.getAbstractFileByPath(assets)) {
        await this.plugin.app.vault.createFolder(assets);
      }
      const slug = this.nameSlug(entity);
      const dot = file.name.lastIndexOf(".");
      const ext = dot !== -1 ? file.name.slice(dot).toLowerCase() : "";
      let destPath;
      if (type === "avatar") {
        destPath = `${assets}/${slug}_avatar${ext}`;
      } else {
        let n = 1;
        while (this.plugin.app.vault.getAbstractFileByPath(`${assets}/${slug}_${type}_${n}${ext}`))
          n++;
        destPath = `${assets}/${slug}_${type}_${n}${ext}`;
      }
      const buffer = await file.arrayBuffer();
      const existing = this.plugin.app.vault.getAbstractFileByPath(destPath);
      if (existing instanceof import_obsidian7.TFile) {
        await this.plugin.app.vault.modifyBinary(existing, buffer);
      } else {
        await this.plugin.app.vault.createBinary(destPath, buffer);
      }
      return destPath;
    } catch (e) {
      return null;
    }
  }
  // ---- лайтбокс ----
  openLightbox(url) {
    const overlay = document.createElement("div");
    overlay.className = "scenarist-lightbox";
    const close = () => {
      overlay.remove();
      document.removeEventListener("keydown", onKey);
    };
    const onKey = (e) => {
      if (e.key === "Escape")
        close();
    };
    overlay.onclick = close;
    const img = document.createElement("img");
    img.className = "scenarist-lightbox-img";
    img.src = url;
    img.onclick = (e) => e.stopPropagation();
    overlay.appendChild(img);
    document.addEventListener("keydown", onKey);
    document.body.appendChild(overlay);
  }
  // ---- галерея изображений ----
  renderImageGallery(container, entity, propKey, title, fileType) {
    const rawVal = entity.props[propKey] ? String(entity.props[propKey]) : "";
    const paths = rawVal.split(",").map((p) => p.trim()).filter(Boolean);
    const section = container.createDiv("scenarist-card-section");
    const head = section.createDiv("scenarist-card-body-head");
    head.createEl("div", { cls: "scenarist-card-section-title", text: title });
    const addBtn = head.createEl("button", { cls: "scenarist-card-edit-btn" });
    (0, import_obsidian7.setIcon)(addBtn, "plus");
    addBtn.createEl("span", { text: t("card.gallery.add") });
    addBtn.onclick = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.multiple = true;
      input.onchange = async () => {
        const files = Array.from(input.files || []);
        if (!files.length)
          return;
        const newPaths = [...paths];
        for (const f of files) {
          const p = await this.saveImageToVault(entity, f, fileType);
          if (p)
            newPaths.push(p);
        }
        this.commitProp(entity, propKey, newPaths.join(", ") || null);
      };
      input.click();
    };
    const grid = section.createDiv("scenarist-img-gallery");
    if (paths.length === 0) {
      grid.createEl("span", { cls: "scenarist-muted", text: t("card.gallery.empty") });
      return;
    }
    for (const imgPath of paths) {
      const file = this.plugin.app.vault.getAbstractFileByPath(imgPath);
      if (!(file instanceof import_obsidian7.TFile))
        continue;
      const url = this.plugin.app.vault.getResourcePath(file);
      const cell = grid.createDiv("scenarist-img-cell");
      cell.createEl("img", { cls: "scenarist-img-thumb", attr: { src: url } }).onclick = () => this.openLightbox(url);
      const del = cell.createDiv("scenarist-img-del");
      (0, import_obsidian7.setIcon)(del, "x");
      del.onclick = (e) => {
        e.stopPropagation();
        this.commitProp(entity, propKey, paths.filter((p) => p !== imgPath).join(", ") || null);
      };
    }
  }
  // ---- вкладки персонажа ----
  async renderCharacterTabs(card, entity) {
    const allFields = this.plugin.store.resolved(entity).fields;
    const byTab = (id) => allFields.filter((f) => f.tab === id);
    const tabDefs = [
      { id: "basic", label: t("card.tab.basic") },
      { id: "characteristics", label: t("card.tab.characteristics") },
      { id: "biography", label: t("card.tab.biography") },
      { id: "appearance", label: t("card.tab.appearance") }
    ];
    const tabBar = card.createDiv("scenarist-card-tabbar");
    const sections = {};
    for (const tab of tabDefs) {
      sections[tab.id] = card.createDiv("scenarist-card-tab-section");
    }
    const setTab = (id) => {
      this._charTab = id;
      tabBar.querySelectorAll(".scenarist-card-tab-btn").forEach((el) => {
        el.toggleClass("is-active", el.dataset.tab === id);
      });
      for (const [key, el] of Object.entries(sections)) {
        el.style.display = key === id ? "" : "none";
      }
    };
    for (const tab of tabDefs) {
      const btn = tabBar.createEl("button", { cls: "scenarist-card-tab-btn", text: tab.label });
      btn.dataset.tab = tab.id;
      btn.onclick = () => setTab(tab.id);
    }
    const basicFields = byTab("basic");
    if (basicFields.length > 0) {
      const sec = sections["basic"].createDiv("scenarist-card-section");
      for (const field of basicFields) {
        const row = sec.createDiv("scenarist-prop");
        row.createEl("div", { cls: "scenarist-prop-label", text: t(field.label, void 0, field.label) });
        this.renderFieldControl(row.createDiv("scenarist-prop-value"), entity, field);
      }
      this.renderBacklinksProp(sec, entity);
      this.renderTagsHeader(sec, entity);
    }
    this.renderRelations(sections["basic"], entity);
    this.renderFieldsWithSections(sections["characteristics"], entity, byTab("characteristics"));
    this.renderFieldsWithSections(sections["biography"], entity, byTab("biography"));
    await this.renderBody(sections["biography"], entity);
    this.renderFieldsWithSections(sections["appearance"], entity, byTab("appearance"));
    this.renderImageGallery(sections["appearance"], entity, "references", t("card.gallery.references"), "ref");
    this.renderImageGallery(sections["appearance"], entity, "sketches", t("card.gallery.sketches"), "draw");
    setTab(this._charTab);
  }
  /** Рендер группы полей с автозаголовками подразделов. */
  renderFieldsWithSections(container, entity, fields) {
    if (fields.length === 0)
      return;
    const sec = container.createDiv("scenarist-card-section");
    let lastSection = "";
    for (const field of fields) {
      if (field.section && field.section !== lastSection) {
        lastSection = field.section;
        sec.createEl("div", {
          cls: "scenarist-prop-section-head",
          text: t(`card.section.${field.section}`, void 0, field.section)
        });
      }
      const row = sec.createDiv("scenarist-prop");
      row.createEl("div", { cls: "scenarist-prop-label", text: t(field.label, void 0, field.label) });
      this.renderFieldControl(row.createDiv("scenarist-prop-value"), entity, field);
    }
  }
  // ---- тело ----
  async renderBody(card, entity) {
    const section = card.createDiv("scenarist-card-section scenarist-card-body");
    const head = section.createDiv("scenarist-card-body-head");
    head.createEl("div", { cls: "scenarist-card-section-title", text: t("card.text") });
    const editBtn = head.createEl("button", { cls: "scenarist-card-edit-btn" });
    (0, import_obsidian7.setIcon)(editBtn, "pencil");
    editBtn.createEl("span", { text: t("card.edit") });
    editBtn.onclick = () => this.plugin.sync.openNote(entity);
    const file = entity.filePath ? this.plugin.app.vault.getAbstractFileByPath(entity.filePath) : null;
    const target = section.createDiv("scenarist-card-body-render markdown-rendered");
    if (file instanceof import_obsidian7.TFile) {
      const raw = await this.plugin.app.vault.cachedRead(file);
      const body = this.stripFrontmatter(raw).trim();
      if (body) {
        await import_obsidian7.MarkdownRenderer.render(this.plugin.app, body, target, file.path, this);
      } else {
        target.createEl("p", { cls: "scenarist-muted", text: t("card.emptyBody") });
      }
    } else {
      target.createEl("p", {
        cls: "scenarist-muted",
        text: t("card.noteNotCreated")
      });
    }
  }
  /** Открыть встроенный поиск Obsidian с фильтром по тегу. */
  openTagSearch(tag) {
    var _a, _b, _c, _d, _e;
    const query = `tag:#${tag}`;
    const search = (_b = (_a = this.app.internalPlugins) == null ? void 0 : _a.getPluginById) == null ? void 0 : _b.call(_a, "global-search");
    if ((search == null ? void 0 : search.enabled) && ((_c = search.instance) == null ? void 0 : _c.openGlobalSearch)) {
      search.instance.openGlobalSearch(query);
      return;
    }
    (_e = (_d = this.app.commands) == null ? void 0 : _d.executeCommandById) == null ? void 0 : _e.call(_d, "global-search:open");
  }
  /**
   * Убирает YAML frontmatter из контента для рендеринга тела заметки.
   * Используется ТОЛЬКО для чтения/отображения — никогда для записи.
   * Запись frontmatter происходит исключительно через SyncEngine.syncToNote
   * (app.fileManager.processFrontMatter).
   */
  stripFrontmatter(content) {
    if (content.startsWith("---")) {
      const end = content.indexOf("\n---", 3);
      if (end !== -1) {
        const after = content.indexOf("\n", end + 1);
        return after !== -1 ? content.slice(after + 1) : "";
      }
    }
    return content;
  }
};
var EntityFileView = class extends CardView {
  getViewType() {
    return ENTITY_FILE_VIEW;
  }
  canAcceptExtension(extension) {
    return extension === "sc";
  }
  async onLoadFile(file) {
    try {
      const raw = await this.app.vault.read(file);
      const data = JSON.parse(raw);
      if (data.id) {
        if (!this.plugin.store.get(data.id)) {
          this.plugin.store.importEntity(data);
        }
        this.pinnedId = data.id;
        this._charTab = "basic";
        await this.render();
      }
    } catch (e) {
    }
  }
  async onUnloadFile(_file) {
    this.pinnedId = null;
    this.scheduleRender();
  }
};

// src/views/BoardView.ts
var import_obsidian8 = require("obsidian");
var BOARD_VIEW = "scenarist-board";
var BoardView = class extends import_obsidian8.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this.plugin = plugin;
  }
  getViewType() {
    return BOARD_VIEW;
  }
  getDisplayText() {
    return t("board.title");
  }
  getIcon() {
    return "kanban-square";
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.render()));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  refresh() {
    this.render();
  }
  projectChapters() {
    const works = this.plugin.store.byKindForProject("work");
    const bookIds = /* @__PURE__ */ new Set();
    works.forEach((w) => (w.links["books"] || []).forEach((id) => bookIds.add(id)));
    return this.plugin.store.byKind("chapter").filter((ch) => (ch.links["book"] || []).some((id) => bookIds.has(id)));
  }
  render() {
    var _a;
    const c = this.containerEl.children[1];
    c.empty();
    c.addClass("scenarist-panel", "scenarist-board");
    const header = c.createDiv("scenarist-panel-header");
    header.createEl("span", { cls: "scenarist-panel-title", text: "\u{1F5C2} " + t("board.title") });
    const statuses = ((_a = SCHEMAS.chapter.fields.find((f) => f.key === "status")) == null ? void 0 : _a.options) || [];
    const chapters = this.projectChapters();
    if (chapters.length === 0) {
      c.createDiv("scenarist-empty").createEl("p", { text: t("board.empty") });
      return;
    }
    const board = c.createDiv("scenarist-board-columns");
    for (const status of statuses) {
      const col = board.createDiv("scenarist-board-col");
      const head = col.createDiv("scenarist-board-col-head");
      const dot = head.createEl("span", { cls: "scenarist-status-dot" });
      dot.style.background = status.color;
      head.createEl("span", { text: status.value });
      const cards = chapters.filter((ch) => ch.props["status"] === status.value);
      head.createEl("span", { cls: "scenarist-count-badge", text: String(cards.length) });
      const drop = col.createDiv("scenarist-board-drop");
      drop.addEventListener("dragover", (e) => {
        e.preventDefault();
        drop.addClass("dragover");
      });
      drop.addEventListener("dragleave", () => drop.removeClass("dragover"));
      drop.addEventListener("drop", (e) => {
        var _a2;
        e.preventDefault();
        drop.removeClass("dragover");
        const id = (_a2 = e.dataTransfer) == null ? void 0 : _a2.getData("text/plain");
        if (id) {
          this.plugin.store.setProp(id, "status", status.value);
          const ch = this.plugin.store.get(id);
          if (ch)
            this.plugin.sync.syncToNote(ch);
        }
      });
      for (const ch of cards)
        this.renderCard(drop, ch);
    }
    const noStatus = chapters.filter((ch) => !statuses.some((s) => s.value === ch.props["status"]));
    if (noStatus.length > 0) {
      const col = board.createDiv("scenarist-board-col");
      col.createDiv("scenarist-board-col-head").createEl("span", { text: t("board.noStatus") });
      const drop = col.createDiv("scenarist-board-drop");
      for (const ch of noStatus)
        this.renderCard(drop, ch);
    }
  }
  renderCard(container, ch) {
    const card = container.createDiv("scenarist-board-card");
    card.draggable = true;
    card.createEl("div", { cls: "scenarist-board-card-title", text: ch.name });
    const synopsis = ch.props["synopsis"];
    if (typeof synopsis === "string" && synopsis) {
      card.createEl("div", {
        cls: "scenarist-board-card-desc",
        text: synopsis.slice(0, 90) + (synopsis.length > 90 ? "\u2026" : "")
      });
    }
    card.addEventListener("dragstart", (e) => {
      var _a;
      (_a = e.dataTransfer) == null ? void 0 : _a.setData("text/plain", ch.id);
      card.addClass("dragging");
    });
    card.addEventListener("dragend", () => card.removeClass("dragging"));
    card.onclick = () => this.plugin.navigateTo(ch.id);
    card.ondblclick = () => this.plugin.sync.openNote(ch);
  }
};

// src/views/GraphView.ts
var import_obsidian9 = require("obsidian");
var GRAPH_VIEW = "scenarist-graph";
var SVG_NS = "http://www.w3.org/2000/svg";
var NODE_COLORS = {
  work: "#9b59b6",
  character: "#4a9eff",
  categoryItem: "#f5a623",
  arc: "#1abc9c",
  anchor: "#e84393",
  book: "#7ed321"
};
var GRAPH_KINDS = ["work", "character", "categoryItem", "arc", "anchor"];
var GraphView = class extends import_obsidian9.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this.plugin = plugin;
  }
  getViewType() {
    return GRAPH_VIEW;
  }
  getDisplayText() {
    return t("commands.openGraph");
  }
  getIcon() {
    return "git-fork";
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.render()));
    this.unsub.push(this.plugin.onSelect(() => this.render()));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  refresh() {
    this.render();
  }
  render() {
    const c = this.containerEl.children[1];
    c.empty();
    c.addClass("scenarist-panel", "scenarist-graph");
    const entities = this.plugin.store.all().filter((e) => GRAPH_KINDS.includes(e.kind) && this.plugin.store.inActiveProject(e));
    if (entities.length === 0) {
      c.createDiv("scenarist-empty").createEl("p", {
        text: t("graph.empty")
      });
      return;
    }
    const W = 800;
    const H = 600;
    const idSet = new Set(entities.map((e) => e.id));
    const nodes = entities.map((e, i) => {
      const a = i / entities.length * Math.PI * 2;
      return { e, x: W / 2 + Math.cos(a) * 180, y: H / 2 + Math.sin(a) * 180, vx: 0, vy: 0 };
    });
    const index = new Map(nodes.map((n) => [n.e.id, n]));
    const edges = [];
    const seen = /* @__PURE__ */ new Set();
    for (const n of nodes) {
      for (const key of Object.keys(n.e.links)) {
        for (const tid of n.e.links[key]) {
          if (!idSet.has(tid))
            continue;
          const k = [n.e.id, tid].sort().join("|");
          if (seen.has(k))
            continue;
          seen.add(k);
          const tgt = index.get(tid);
          if (tgt)
            edges.push([n, tgt]);
        }
      }
    }
    this.simulate(nodes, edges, W, H);
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.addClass("scenarist-graph-svg");
    c.appendChild(svg);
    const edgeEls = edges.map(([a, b]) => {
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("class", "scenarist-graph-edge");
      this.setLine(line, a, b);
      svg.appendChild(line);
      return { line, a, b };
    });
    for (const n of nodes)
      this.renderNode(svg, n, edgeEls);
    const legend = c.createDiv("scenarist-graph-legend");
    const legendKeys = [
      ["work", t("graph.legend.work")],
      ["character", t("graph.legend.character")],
      ["categoryItem", t("graph.legend.categoryItem")],
      ["arc", t("graph.legend.arc")],
      ["anchor", t("graph.legend.anchor")]
    ];
    for (const [kind, label] of legendKeys) {
      const item = legend.createDiv("scenarist-legend-item");
      const dot = item.createEl("span", { cls: "scenarist-status-dot" });
      dot.style.background = NODE_COLORS[kind] || "#888";
      item.createEl("span", { text: label });
    }
  }
  setLine(line, a, b) {
    line.setAttribute("x1", String(a.x));
    line.setAttribute("y1", String(a.y));
    line.setAttribute("x2", String(b.x));
    line.setAttribute("y2", String(b.y));
  }
  /** Простая force-directed раскладка (Fruchterman–Reingold-подобная). */
  simulate(nodes, edges, W, H) {
    const area = W * H;
    const k = Math.sqrt(area / Math.max(nodes.length, 1)) * 0.8;
    let temp = W / 8;
    const iterations = 250;
    for (let it = 0; it < iterations; it++) {
      for (const n of nodes) {
        n.vx = 0;
        n.vy = 0;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
          const rep = k * k / dist;
          const ux = dx / dist;
          const uy = dy / dist;
          a.vx += ux * rep;
          a.vy += uy * rep;
          b.vx -= ux * rep;
          b.vy -= uy * rep;
        }
      }
      for (const [a, b] of edges) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const att = dist * dist / k;
        const ux = dx / dist;
        const uy = dy / dist;
        a.vx -= ux * att;
        a.vy -= uy * att;
        b.vx += ux * att;
        b.vy += uy * att;
      }
      for (const n of nodes) {
        const disp = Math.sqrt(n.vx * n.vx + n.vy * n.vy) || 0.01;
        n.x += n.vx / disp * Math.min(disp, temp);
        n.y += n.vy / disp * Math.min(disp, temp);
        n.x = Math.max(40, Math.min(W - 40, n.x));
        n.y = Math.max(40, Math.min(H - 40, n.y));
      }
      temp *= 0.95;
    }
  }
  renderNode(svg, n, edgeEls) {
    const g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("class", "scenarist-graph-node");
    const place = () => g.setAttribute("transform", `translate(${n.x}, ${n.y})`);
    place();
    const circle = document.createElementNS(SVG_NS, "circle");
    const selected = n.e.id === this.plugin.selectedId;
    circle.setAttribute("r", selected ? "11" : "7");
    circle.setAttribute("fill", NODE_COLORS[n.e.kind] || "#888");
    if (selected)
      circle.setAttribute("stroke", "var(--text-normal)");
    g.appendChild(circle);
    const label = document.createElementNS(SVG_NS, "text");
    label.setAttribute("y", "22");
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "scenarist-graph-label");
    label.textContent = n.e.name;
    g.appendChild(label);
    let dragging = false;
    g.addEventListener("mousedown", (ev) => {
      dragging = true;
      ev.preventDefault();
    });
    const move = (ev) => {
      if (!dragging)
        return;
      const pt = this.svgPoint(svg, ev);
      n.x = pt.x;
      n.y = pt.y;
      place();
      for (const e of edgeEls)
        if (e.a === n || e.b === n)
          this.setLine(e.line, e.a, e.b);
    };
    const up = () => {
      dragging = false;
    };
    svg.addEventListener("mousemove", move);
    svg.addEventListener("mouseup", up);
    svg.addEventListener("mouseleave", up);
    g.addEventListener("click", () => {
      if (!dragging)
        this.plugin.navigateTo(n.e.id);
    });
    svg.appendChild(g);
  }
  svgPoint(svg, ev) {
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const x = (ev.clientX - rect.left) / rect.width * vb.width;
    const y = (ev.clientY - rect.top) / rect.height * vb.height;
    return { x, y };
  }
};

// src/views/TimelineView.ts
var import_obsidian10 = require("obsidian");
var TIMELINE_VIEW = "scenarist-timeline";
var TimelineView = class extends import_obsidian10.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this.plugin = plugin;
  }
  getViewType() {
    return TIMELINE_VIEW;
  }
  getDisplayText() {
    return t("timeline.title");
  }
  getIcon() {
    return "clock";
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.render()));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  refresh() {
    this.render();
  }
  anchorsOf(workId) {
    return this.plugin.store.byKind("anchor").filter((a) => (a.links["work"] || []).includes(workId)).sort((a, b) => {
      var _a, _b;
      const oa = Number((_a = a.props["order"]) != null ? _a : 1e9);
      const ob = Number((_b = b.props["order"]) != null ? _b : 1e9);
      return oa - ob || a.createdAt - b.createdAt;
    });
  }
  render() {
    const c = this.containerEl.children[1];
    c.empty();
    c.addClass("scenarist-panel", "scenarist-timeline-view");
    const workId = this.plugin.timelineWorkId;
    const work = workId ? this.plugin.store.get(workId) : null;
    const header = c.createDiv("scenarist-panel-header");
    header.createEl("span", {
      cls: "scenarist-panel-title",
      text: work ? "\u{1F552} " + t("timeline.titleWork", { name: work.name }) : "\u{1F552} " + t("timeline.title")
    });
    if (!work) {
      c.createDiv("scenarist-empty").createEl("p", {
        text: t("timeline.noWork")
      });
      return;
    }
    const anchors = this.anchorsOf(work.id);
    if (anchors.length === 0) {
      c.createDiv("scenarist-empty").createEl("p", {
        text: t("timeline.noAnchors")
      });
      return;
    }
    const rail = c.createDiv("scenarist-tl-rail");
    anchors.forEach((a, idx) => this.renderNode(rail, a, idx, anchors));
  }
  renderNode(rail, anchor, index, all) {
    const node = rail.createDiv("scenarist-tl-node");
    node.draggable = true;
    const dot = node.createDiv("scenarist-tl-dot");
    dot.setText("\u2693");
    const card = node.createDiv("scenarist-tl-card");
    card.createEl("div", { cls: "scenarist-tl-title", text: anchor.name });
    const date = anchor.props["date"];
    if (date)
      card.createEl("div", { cls: "scenarist-tl-date", text: String(date) });
    const desc = anchor.props["description"];
    if (typeof desc === "string" && desc) {
      card.createEl("div", {
        cls: "scenarist-tl-desc",
        text: desc.slice(0, 70) + (desc.length > 70 ? "\u2026" : "")
      });
    }
    card.onclick = () => this.plugin.navigateTo(anchor.id);
    card.ondblclick = () => this.plugin.sync.openNote(anchor);
    node.addEventListener("dragstart", (e) => {
      var _a;
      (_a = e.dataTransfer) == null ? void 0 : _a.setData("text/plain", anchor.id);
      node.addClass("dragging");
    });
    node.addEventListener("dragend", () => node.removeClass("dragging"));
    node.addEventListener("dragover", (e) => e.preventDefault());
    node.addEventListener("drop", (e) => {
      var _a;
      e.preventDefault();
      const draggedId = (_a = e.dataTransfer) == null ? void 0 : _a.getData("text/plain");
      if (!draggedId || draggedId === anchor.id)
        return;
      this.reorder(draggedId, index, all);
    });
  }
  reorder(draggedId, targetIndex, all) {
    const ids = all.map((a) => a.id).filter((id) => id !== draggedId);
    ids.splice(targetIndex, 0, draggedId);
    ids.forEach((id, i) => this.plugin.store.setProp(id, "order", i + 1));
    ids.forEach((id) => {
      const e = this.plugin.store.get(id);
      if (e)
        this.plugin.sync.syncToNote(e);
    });
  }
};

// src/main.ts
var ScenaristPlugin = class extends import_obsidian11.Plugin {
  // ── Обратная совместимость для views, которые читают plugin.selectedId ──
  get selectedId() {
    return this.state.selectedId;
  }
  get timelineWorkId() {
    return this.state.timelineWorkId;
  }
  async onload() {
    await this.loadSettings();
    setLocale(detectLang());
    this.store = new ScenaristStore(this);
    this.sync = new SyncEngine(this);
    this.state = new ScenaristState(this);
    await this.store.load();
    if (this.settings.lastSelectedId) {
      const restored = this.store.get(this.settings.lastSelectedId);
      if (restored)
        this.state.selectedId = this.settings.lastSelectedId;
    }
    this.registerView(NAVIGATOR_VIEW, (leaf) => new NavigatorView(leaf, this));
    this.registerView(CARD_VIEW, (leaf) => new CardView(leaf, this));
    this.registerView(ENTITY_FILE_VIEW, (leaf) => new EntityFileView(leaf, this));
    this.registerView(BOARD_VIEW, (leaf) => new BoardView(leaf, this));
    this.registerView(GRAPH_VIEW, (leaf) => new GraphView(leaf, this));
    this.registerView(TIMELINE_VIEW, (leaf) => new TimelineView(leaf, this));
    this.addRibbonIcon("film", t("commands.ribbon"), () => this.activateLayout());
    this.addCommand({ id: "open-scenarist", name: t("commands.openScenarist"), callback: () => this.activateLayout() });
    this.addCommand({ id: "open-board", name: t("commands.openBoard"), callback: () => this.openCentre(BOARD_VIEW) });
    this.addCommand({ id: "open-graph", name: t("commands.openGraph"), callback: () => this.openCentre(GRAPH_VIEW) });
    this.addCommand({
      id: "new-project",
      name: t("commands.newProject"),
      callback: () => new CreateEntityModal(this.app, this, { kind: "project", titleHint: t("nav.newProject") }).open()
    });
    this.addCommand({
      id: "new-work",
      name: t("commands.newWork"),
      callback: () => new CreateWorkModal(this.app, this).open()
    });
    this.addCommand({
      id: "new-character",
      name: t("commands.newCharacter"),
      callback: () => new CreateEntityModal(this.app, this, { kind: "character" }).open()
    });
    this.addCommand({
      id: "new-category",
      name: t("commands.newCategory"),
      callback: () => new CreateCategoryModal(this.app, this).open()
    });
    this.addSettingTab(new ScenaristSettingsTab(this.app, this));
    this.registerEvent(
      this.app.vault.on("modify", (file) => {
        if (file instanceof import_obsidian11.TFile)
          this.sync.handleModify(file);
      })
    );
    this.registerEvent(
      this.app.vault.on("rename", (file, oldPath) => {
        if (file instanceof import_obsidian11.TFile)
          this.sync.handleRename(file, oldPath);
      })
    );
    this.registerEvent(
      this.app.vault.on("create", (file) => {
        if (file instanceof import_obsidian11.TFile)
          this.sync.handleCreate(file);
      })
    );
    this.addCommand({
      id: "rescan-vault",
      name: t("commands.rescanVault"),
      callback: () => void this.sync.rescanVault()
    });
    this.app.workspace.onLayoutReady(() => {
      if (this.app.workspace.getLeavesOfType(NAVIGATOR_VIEW).length === 0)
        this.activateLayout();
      this.injectMarkdownButtons();
      void this.sync.rescanVault();
    });
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.injectMarkdownButtons()));
    this.registerEvent(this.app.workspace.on("layout-change", () => this.injectMarkdownButtons()));
    this.registerExtensions(["sc"], ENTITY_FILE_VIEW);
  }
  onunload() {
    this.state.flushSave();
    void this.store.save();
    void this.saveSettings();
  }
  // ---- делегируем в state ----
  select(id) {
    this.state.select(id);
    if (id)
      void this.ensureCard();
  }
  navigateTo(id) {
    this.state.navigateTo(id);
    void this.ensureCard();
  }
  back() {
    this.state.back();
  }
  canGoBack() {
    return this.state.canGoBack();
  }
  onSelect(fn) {
    return this.state.onSelect(fn);
  }
  refreshViews() {
    void this.store.save();
    this.state.notify();
  }
  /** Принудительно перерисовать все открытые вью (например, после смены языка). */
  refreshAllViews() {
    const views = [NAVIGATOR_VIEW, CARD_VIEW, BOARD_VIEW, GRAPH_VIEW, TIMELINE_VIEW];
    for (const type of views) {
      this.app.workspace.getLeavesOfType(type).forEach((leaf) => {
        var _a, _b;
        (_b = (_a = leaf.view).refresh) == null ? void 0 : _b.call(_a);
      });
    }
  }
  async openTimeline(workId) {
    this.state.timelineWorkId = workId;
    await this.openCentre(TIMELINE_VIEW);
    this.state.notify();
  }
  // ---- лейаут ----
  async activateLayout() {
    const { workspace } = this.app;
    let nav = workspace.getLeavesOfType(NAVIGATOR_VIEW)[0];
    if (!nav) {
      nav = workspace.getLeftLeaf(false);
      await nav.setViewState({ type: NAVIGATOR_VIEW, active: true });
    }
    await this.ensureCard();
    workspace.revealLeaf(nav);
  }
  async ensureCard() {
    let card = this.app.workspace.getLeavesOfType(CARD_VIEW)[0];
    if (!card) {
      card = this.app.workspace.getLeaf(false);
      await card.setViewState({ type: CARD_VIEW, active: true });
    }
    this.app.workspace.revealLeaf(card);
    return card;
  }
  async openCentre(type) {
    const existing = this.app.workspace.getLeavesOfType(type)[0];
    const leaf = existing || this.app.workspace.getLeaf("tab");
    await leaf.setViewState({ type, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  injectMarkdownButtons() {
    this.app.workspace.iterateAllLeaves((leaf) => {
      var _a;
      if (leaf.view.getViewType() !== "markdown")
        return;
      const viewEl = leaf.view.containerEl;
      const file = (_a = leaf.view.file) != null ? _a : null;
      viewEl.querySelectorAll(".scenarist-md-open-btn").forEach((el) => el.remove());
      if (!file)
        return;
      const entity = this.store.findByPath(file.path);
      if (!entity)
        return;
      const btn = leaf.view.addAction(
        "film",
        t("commands.openInScenarist"),
        () => this.navigateTo(entity.id)
      );
      btn.addClass("scenarist-md-open-btn");
    });
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    let migrated = false;
    for (const qt of this.settings.categoryQuickTypes) {
      if (qt.isDefault) {
        const def = DEFAULT_QUICK_TYPES.find((d) => d.id === qt.id);
        if (def && [...qt.icon].length <= 2) {
          qt.icon = def.icon;
          migrated = true;
        }
      }
    }
    if (migrated)
      await this.saveSettings();
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
