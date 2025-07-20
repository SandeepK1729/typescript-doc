import { describe, it, expect } from 'vitest';

import DeepPartial from '@/types/deep-partial/deep-partial';
import deepMerge from '../deepMerge';


describe('deepMerge', () => {
  it('should handle null overrides', () => {
    const source: { a: number | null, b: number, c?: number } = { a: 1, b: 2 };
    const overrides = { a: null, c: 2 };
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual({ a: 1, b: 2, c: 2 });
  });

  it('should concatenate arrays', () => {
    const source = [1, 2, 3];
    const overrides = [4, 5];
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should merge simple objects', () => {
    const source = { a: 1, b: 2 };
    const overrides = { b: 3 };
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual({ a: 1, b: 3 });
  });

  it('should override primitive values', () => {
    const source = { name: 'John', age: 30 };
    const overrides = { age: 31 };
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual({ name: 'John', age: 31 });
  });

  it('should handle nested object merging', () => {
    const source = {
      user: { name: 'John', settings: { theme: 'dark' } },
      count: 5
    };
    const overrides = {
      user: { settings: { theme: 'light' } }
    };
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual({
      user: { name: 'John', settings: { theme: 'light' } },
      count: 5
    });
  });

  it('should handle undefined overrides', () => {
    const source = { a: 1, b: 2 };
    const overrides = { a: undefined };
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual({ a: 1, b: 2 }); // Current bug: undefined values are ignored
  });

  it('should handle empty objects', () => {
    const source = { a: 1 };
    const overrides = {};
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual({ a: 1 });
  });

  it('should handle complex nested structures', () => {
    const source = {
      config: {
        database: { host: 'localhost', port: 5432 },
        cache: { enabled: true }
      },
      features: ['auth', 'logging']
    };
    const overrides = {
      config: {
        database: { port: 3306 },
      },
      features: ['metrics']
    };
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual({
      config: {
        database: { host: 'localhost', port: 3306 },
        cache: { enabled: true },
      },
      features: ['auth', 'logging', 'metrics']
    });
  });

  it('should return override, when overrides is not an object', () => {
    const source: string = "hello"
    const result1 = deepMerge(source, 'string');
    
    expect(result1).toBe('string');
  });

  it('should work with TypeScript interfaces', () => {
    interface User {
      id: number;
      profile: {
        name: string;
        email: string;
      };
    }

    const source: User = {
      id: 1,
      profile: { name: 'John', email: 'john@example.com' }
    };
    const overrides: DeepPartial<User> = {
      profile: { name: 'Jane' }
    };
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual({
      id: 1,
      profile: { name: 'Jane', email: 'john@example.com' }
    });
  });

  it('should handle zero and false values correctly', () => {
    const source = { count: 10, enabled: true };
    const overrides = { count: 0, enabled: false };
    const result = deepMerge(source, overrides);
    
    expect(result).toEqual({ count: 0, enabled: false }); // Current bug: falsy values are ignored
  });
});