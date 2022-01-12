import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignup } from 'hooks/useSignup';

import { Input } from 'components/Shared/Input';
import { Button } from 'components/Shared/Button';
import { NavyLink } from 'components/Shared/NavyLink';

export function SignupForm() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
    const setPasswordNotShown = () => setPasswordShown(false);

    const { signup, error, isPending } = useSignup();
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data, e) => {
        e.preventDefault();
        signup(data.email, data.password, data.firstname, data.lastname);
    };

    return (
        <div>
            <h1 className="mt-6 text-3xl font-bold text-navy-400 select-none">Εγγραφή στο GreekQA</h1>
            <div className="mt-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input label="Όνομα" id="firstname" name="firstname" type="text" autoComplete="given-name" placeholder="Το όνομά σου (π.χ. ΙΩΑΝΝΗΣ)"
                        errors={errors.firstname} register={register("firstname", { required: "Παρακαλώ συμπλήρωσε το όνομά σου",
                                                                                    pattern: {
                                                                                        message: "Παρακαλώ συμπλήρωσε το όνομα σου χωρίς κενά (διπλά ονόματα με παύλα)",
                                                                                        value: /^[a-zA-Zα-ωΑ-ΩΆΈΊΌΎΏΫΏΪΫΏΩΏάέήίόύώϊϋϊϋΐΰΆΈΉΊΌΎΏΫΏΪΫΏΩΏάέήίόύώϊϋϊϋΐΰ]+$/
                                                                                  }})}
                    />
                    <Input label="Επώνυμο" id="lastname" name="lastname" type="text" autoComplete="family-name" placeholder="Το επώνυμό σου (π.χ. ΠΑΠΑΔΟΠΟΥΛΟΣ)"
                        errors={errors.lastname} register={register("lastname", {   required: "Παρακαλώ συμπλήρωσε το επώνυμό σου",
                                                                                    pattern: {
                                                                                        message: "Παρακαλώ συμπλήρωσε το επώνυμό σου χωρίς κενά (διπλά ονόματα με παύλα)",
                                                                                        value: /^[a-zA-Zα-ωΑ-ΩΆΈΊΌΎΏΫΏΪΫΏΩΏάέήίόύώϊϋϊϋΐΰΆΈΉΊΌΎΏΫΏΪΫΏΩΏάέήίόύώϊϋϊϋΐΰ]+$/
                                                                                }})}
                    />
                    <Input label="Διεύθυνση email" id="email" name="email" type="email" autoComplete="email" placeholder="To email σου (*.uoa.gr)"
                        errors={errors.email} register={register("email", { required: "Παρακαλώ συμπλήρωσε το email σου",
                                                                            pattern: {
                                                                                message: "Παρακαλώ συμπλήρωσε ένα email που τελειώνει σε .uoa.gr",
                                                                                value: /^[^@]+@[^@]+\.uoa.gr$/
                                                                            }})}
                    />
                    <Input label="Συνθηματικό" id="password" name="password" type="password" autoComplete="new-password" placeholder="To συνθηματικό σου"
                        passwordShown={passwordShown} togglePasswordVisibility={togglePasswordVisibility}
                        errors={errors.password} register={register("password", {   required: "Παρακαλώ συμπλήρωσε το συνθηματικό σου",
                                                                                    pattern: {
                                                                                        message: "Παρακαλώ συμπλήρωσε ένα έγκυρο συνθηματικό",
                                                                                        value: /^(?=.*[A-Za-zΑ-Ωα-ω])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                                                                                }})}
                    />
                    <div className="ml-2 text-sm text-gray-500">
                        Το συνθηματικό σου πρέπει να έχει τουλάχιστον 8 χαρακτήρες και να περιέχει τουλάχιστον ένα σύμβολο και ένα αριθμό χωρίς	ελληνικούς χαρακτήρες.
                    </div>
                    <Button type="submit" onClick={setPasswordNotShown}>{isPending ? 'Εγγραφή...' : 'Εγγραφή'}</Button>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                </form>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-navy-400" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-700 select-none">Έχεις ήδη λογαριασμό;</span>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <NavyLink className="text-sm" to="/login">Είσοδος στην εφαρμογή (μόνο με email του ΕΚΠΑ)</NavyLink>
                </div>
            </div>
        </div>
    )
}