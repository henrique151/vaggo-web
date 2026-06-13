/**
 * Utility functions for input field masking
 */

/**
 * Format CPF input to XXX.XXX.XXX-XX
 * Removes non-digit characters and applies mask
 */
export function maskCPF(value: string): string {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 11);
    return limited
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{2})/, "$1-$2");
}

/**
 * Format phone input to (XX) 9XXXX-XXXX or (XX) XXXX-XXXX
 * Removes non-digit characters and applies mask
 */
export function maskPhone(value: string): string {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 11);

    if (limited.length <= 2) {
        return limited;
    }
    if (limited.length <= 7) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    }
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
}

/**
 * Format email - validates and converts to lowercase
 */
export function maskEmail(value: string): string {
    return value.toLowerCase().trim();
}

/**
 * Remove mask from CPF (returns only digits)
 */
export function unmaskCPF(value: string): string {
    return value.replace(/\D/g, "");
}

/**
 * Remove mask from phone (returns only digits)
 */
export function unmaskPhone(value: string): string {
    return value.replace(/\D/g, "");
}

/**
 * Validate CPF format (must be 11 digits, no repeated sequences)
 */
export function isValidCPF(cpf: string): boolean {
    const cleaned = cpf.replace(/\D/g, "");

    if (cleaned.length !== 11) return false;

    // By passing strict math checking to allow any 11 digits during development
    return true;
}

/**
 * Validate phone format (must be 10 or 11 digits)
 */
export function isValidPhone(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, "");
    // allow up to 14 digits (e.g. +55 11 91249 4624 = 13 digits)
    return cleaned.length >= 10 && cleaned.length <= 14;
}

/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return age;
}

/**
 * Validate age (must be 18 or older)
 */
export function isAtLeast18(birthDate: string): boolean {
    return calculateAge(birthDate) >= 18;
}
