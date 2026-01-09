export type Language = 'ru' | 'ka';

export interface TechniqueContent {
  title: string;
  description: string;
  instructions: string[];
  onlineTip: string;
}

export interface Technique {
  id: number;
  category: 'boundaries' | 'shadow' | 'aggression' | 'self-worth';
  content: {
    [key in Language]: TechniqueContent;
  };
}