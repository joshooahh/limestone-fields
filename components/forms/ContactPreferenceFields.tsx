'use client'

import type { Control, FieldValues, Path } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const ERROR_CLASS = 'text-[#f7e7d5] text-xs'

/**
 * Mobile number, "text or email" choice, and the SMS consent checkbox, shared
 * by every form that posts to /api/buyout-inquiry so the copy stays identical.
 *
 * The consent wording is written to the TCPA standard: it says who is texting,
 * what about, that consent is not a condition of anything, how to stop, and
 * that carrier rates may apply. Edit it here and nowhere else.
 */
export const SMS_CONSENT_COPY =
  'Yes, Limestone Fields may text me about this inquiry at the mobile number above. ' +
  'Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time, HELP for help. ' +
  'Consent is not a condition of booking.'

type Props<T extends FieldValues> = {
  control: Control<T>
  phoneName: Path<T>
  preferenceName: Path<T>
  consentName: Path<T>
  /** Current value of the preference field, so the consent box can be relaxed to optional when email is chosen. */
  preference: 'text' | 'email' | undefined
}

export default function ContactPreferenceFields<T extends FieldValues>({
  control,
  phoneName,
  preferenceName,
  consentName,
  preference,
}: Props<T>) {
  return (
    <>
      <FormField
        control={control}
        name={phoneName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mobile number *</FormLabel>
            <FormControl>
              <Input type="tel" autoComplete="tel" inputMode="tel" placeholder="(254) 555-0100" {...field} />
            </FormControl>
            <FormMessage className={ERROR_CLASS} />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={preferenceName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>How would you like to hear from us? *</FormLabel>
            <FormControl>
              <div className="flex gap-6 pt-1 text-[15px] text-[#f7f2e4]">
                {(['text', 'email'] as const).map((opt) => (
                  <span key={opt} className="inline-flex items-center gap-2 cursor-pointer text-[15px] font-body text-[#f7f2e4]">
                    <input
                      type="radio"
                      name={field.name}
                      value={opt}
                      checked={field.value === opt}
                      onChange={() => field.onChange(opt)}
                      onBlur={field.onBlur}
                      className="h-4 w-4 accent-[#f7f2e4]"
                    />
                    {opt === 'text' ? 'Text me (fastest)' : 'Email me'}
                  </span>
                ))}
              </div>
            </FormControl>
            <FormMessage className={ERROR_CLASS} />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={consentName}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  checked={Boolean(field.value)}
                  onCheckedChange={(v) => field.onChange(v === true)}
                  className="mt-1 border-[#b3c1ce] data-[state=checked]:bg-[#f7f2e4] data-[state=checked]:text-[#253136]"
                  aria-describedby="sms-consent-copy"
                />
              </FormControl>
              <span
                id="sms-consent-copy"
                role="presentation"
                className="text-[13px] leading-relaxed text-[#b3c1ce] font-body cursor-pointer"
                onClick={() => field.onChange(!field.value)}
              >
                {SMS_CONSENT_COPY}
                {preference === 'text' ? ' Required to text you.' : ' Optional if you chose email.'}
              </span>
            </div>
            <FormMessage className={ERROR_CLASS} />
          </FormItem>
        )}
      />
    </>
  )
}
