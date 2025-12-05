import { describe, it, expect } from 'vitest';
import {
  updateQualificationCriteria,
  calculateQualificationScore,
  getQualificationStatus,
} from '../services/qualification';

describe('Qualification System', () => {
  describe('updateQualificationCriteria', () => {
    const basePatient = {
      id: 'test-id',
      has_budget: false,
      has_urgency: false,
      is_local: false,
      interested_in_appointment: false,
      preferred_service: null,
    };

    it('should detect budget indicators', async () => {
      const messages = [
        'Tengo presupuesto para el tratamiento',
        'Cuánto cuesta el blanqueamiento?',
        'Me gustaría saber el precio',
        'Puedo pagar en cuotas?',
      ];

      for (const message of messages) {
        const updates = await updateQualificationCriteria(message, basePatient);
        expect(updates.has_budget).toBe(true);
      }
    });

    it('should detect urgency indicators', async () => {
      const messages = [
        'Me duele mucho la muela',
        'Es urgente, necesito atención',
        'Lo antes posible por favor',
        'Tengo una molestia muy fuerte',
      ];

      for (const message of messages) {
        const updates = await updateQualificationCriteria(message, basePatient);
        expect(updates.has_urgency).toBe(true);
      }
    });

    it('should detect location indicators', async () => {
      const messages = [
        'Soy de Barranquilla',
        'Vivo en el norte de la ciudad',
        'Estoy en Soledad, está cerca?',
        'Vivo en Riomar',
      ];

      for (const message of messages) {
        const updates = await updateQualificationCriteria(message, basePatient);
        expect(updates.is_local).toBe(true);
      }
    });

    it('should detect appointment interest', async () => {
      const messages = [
        'Quiero agendar una cita',
        'Cuándo hay disponibilidad?',
        'Me gustaría una valoración',
        'Puedo ir mañana?',
      ];

      for (const message of messages) {
        const updates = await updateQualificationCriteria(message, basePatient);
        expect(updates.interested_in_appointment).toBe(true);
      }
    });

    it('should detect service preferences', async () => {
      const testCases = [
        { message: 'Quiero blanqueamiento dental', expected: 'estetica_dental' },
        { message: 'Me interesa el diseño de sonrisa', expected: 'diseno_sonrisa' },
        { message: 'Necesito implantes dentales', expected: 'rehabilitacion_oral' },
      ];

      for (const { message, expected } of testCases) {
        const updates = await updateQualificationCriteria(message, basePatient);
        expect(updates.preferred_service).toBe(expected);
      }
    });

    it('should not update already qualified criteria', async () => {
      const qualifiedPatient = {
        ...basePatient,
        has_budget: true,
        has_urgency: true,
      };

      const updates = await updateQualificationCriteria(
        'Me duele y tengo presupuesto',
        qualifiedPatient
      );

      expect(updates.has_budget).toBeUndefined();
      expect(updates.has_urgency).toBeUndefined();
    });
  });

  describe('calculateQualificationScore', () => {
    it('should return 0 for no criteria met', () => {
      const score = calculateQualificationScore({
        has_budget: false,
        has_urgency: false,
        is_local: false,
        interested_in_appointment: false,
      });
      expect(score).toBe(0);
    });

    it('should return correct score for partial criteria', () => {
      expect(
        calculateQualificationScore({
          has_budget: true,
          has_urgency: false,
          is_local: false,
          interested_in_appointment: false,
        })
      ).toBe(1);

      expect(
        calculateQualificationScore({
          has_budget: true,
          has_urgency: true,
          is_local: false,
          interested_in_appointment: false,
        })
      ).toBe(2);
    });

    it('should return 4 for all criteria met', () => {
      const score = calculateQualificationScore({
        has_budget: true,
        has_urgency: true,
        is_local: true,
        interested_in_appointment: true,
      });
      expect(score).toBe(4);
    });
  });

  describe('getQualificationStatus', () => {
    it('should return not_qualified for score 0', () => {
      expect(getQualificationStatus(0)).toBe('not_qualified');
    });

    it('should return pending for scores 1-2', () => {
      expect(getQualificationStatus(1)).toBe('pending');
      expect(getQualificationStatus(2)).toBe('pending');
    });

    it('should return qualified for scores 3-4', () => {
      expect(getQualificationStatus(3)).toBe('qualified');
      expect(getQualificationStatus(4)).toBe('qualified');
    });
  });
});

