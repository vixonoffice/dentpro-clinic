import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data/translations';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Check, Phone, MessageCircle, ArrowLeft, ArrowRight, PartyPopper } from 'lucide-react';

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
const unavailable = ['10:00', '14:30', '16:00'];

const Booking = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '', newPatient: true, privacy: false, sms: true });
  const [submitted, setSubmitted] = useState(false);

  const services = t.booking.bookingServices;
  const doctors = translations[language].doctors.items;

  const canNext = () => {
    if (step === 1) return selectedService !== null;
    if (step === 2) return true;
    if (step === 3) return selectedDate && selectedTime;
    if (step === 4) return form.firstName && form.lastName && form.phone && form.email && form.privacy;
    return false;
  };

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4">
            <PartyPopper className="w-8 h-8 text-success" />
          </div>
          <h2 className="font-serif text-3xl mb-2">✅ {t.booking.successTitle}</h2>
          <p className="text-muted-foreground mb-4">{t.booking.successMsg}</p>
          <div className="card-dental text-left text-sm space-y-2 mb-6">
            <p><strong>{t.booking.service}:</strong> {selectedService !== null ? services[selectedService].name : ''}</p>
            <p><strong>{t.booking.doctor}:</strong> {selectedDoctor !== null ? doctors[selectedDoctor].name : t.booking.noPreference}</p>
            <p><strong>{t.booking.dateTime}:</strong> {selectedDate?.toLocaleDateString()} {selectedTime}</p>
            <p><strong>{t.booking.price}:</strong> {selectedService !== null ? `${services[selectedService].price} RON` : ''}</p>
          </div>
          <Link to="/"><Button variant="heroOutline" size="lg">{t.booking.backHome}</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 lg:pb-0">
      {/* Hero */}
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="pill-green text-sm animate-pulse">{t.booking.badge}</span>
          <h1 className="font-serif text-3xl md:text-5xl mt-4">{t.booking.title}</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">{t.booking.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {s < step ? <Check className="w-4 h-4" /> : s}
                    </div>
                    {s < 4 && <div className={`flex-1 h-1 rounded ${s < step ? 'bg-primary' : 'bg-muted'}`} />}
                  </div>
                ))}
              </div>

              <h2 className="font-serif text-2xl mb-6">
                {t.booking.step} {step} {t.booking.of} 4 — {[t.booking.step1, t.booking.step2, t.booking.step3, t.booking.step4][step - 1]}
              </h2>

              {/* Step 1 */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((s, i) => (
                    <button key={i} onClick={() => setSelectedService(i)}
                      className={`card-dental text-left cursor-pointer ${selectedService === i ? '!border-l-primary ring-2 ring-primary/20' : ''}`}>
                      <h3 className="font-serif text-lg">{s.name}</h3>
                      <p className="text-sm text-muted-foreground">{s.duration}</p>
                      <p className="text-primary font-semibold mt-1">{s.price} RON</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <button onClick={() => setSelectedDoctor(null)}
                    className={`card-dental w-full text-left cursor-pointer ${selectedDoctor === null ? '!border-l-primary ring-2 ring-primary/20' : ''}`}>
                    <span className="pill-green text-xs">{t.booking.recommended}</span>
                    <p className="font-medium mt-1">{t.booking.noPreference}</p>
                  </button>
                  {doctors.map((d, i) => (
                    <button key={i} onClick={() => setSelectedDoctor(i)}
                      className={`card-dental w-full text-left cursor-pointer ${selectedDoctor === i ? '!border-l-primary ring-2 ring-primary/20' : ''}`}>
                      <h3 className="font-serif text-lg">{d.name}</h3>
                      <p className="text-sm text-muted-foreground">{d.spec}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-lg border border-border p-3 pointer-events-auto"
                    />
                  </div>
                  {selectedDate && (
                    <div>
                      <h3 className="font-serif text-lg mb-3">{selectedDate.toLocaleDateString()}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(slot => {
                          const isUnavailable = unavailable.includes(slot);
                          const isSelected = selectedTime === slot;
                          return (
                            <button key={slot} disabled={isUnavailable}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2 rounded-md text-sm font-medium border transition-colors ${isUnavailable ? 'bg-muted text-muted-foreground/40 cursor-not-allowed' : isSelected ? 'bg-primary text-primary-foreground' : 'border-primary/30 text-primary hover:bg-primary/5'}`}>
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-4 max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">{t.booking.firstName} *</label>
                      <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="w-full border border-border rounded-md p-2.5 text-sm bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">{t.booking.lastName} *</label>
                      <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="w-full border border-border rounded-md p-2.5 text-sm bg-background" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.booking.phone} *</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-border rounded-md p-2.5 text-sm bg-background" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.booking.email} *</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border border-border rounded-md p-2.5 text-sm bg-background" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.booking.newPatient}</label>
                    <div className="flex gap-4">
                      <button onClick={() => setForm({ ...form, newPatient: true })} className={`px-4 py-2 rounded-md text-sm border ${form.newPatient ? 'bg-primary text-primary-foreground' : 'border-border'}`}>{t.booking.yes}</button>
                      <button onClick={() => setForm({ ...form, newPatient: false })} className={`px-4 py-2 rounded-md text-sm border ${!form.newPatient ? 'bg-primary text-primary-foreground' : 'border-border'}`}>{t.booking.no}</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{t.booking.message}</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3} className="w-full border border-border rounded-md p-2.5 text-sm bg-background resize-none" />
                  </div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.privacy} onChange={e => setForm({ ...form, privacy: e.target.checked })} className="rounded" /> {t.booking.privacy} *
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.sms} onChange={e => setForm({ ...form, sms: e.target.checked })} className="rounded" /> {t.booking.smsReminder}
                  </label>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)}><ArrowLeft className="w-4 h-4" /> {t.booking.back}</Button>
                ) : <div />}
                {step < 4 ? (
                  <Button variant="hero" disabled={!canNext()} onClick={() => setStep(step + 1)}>{t.booking.next} <ArrowRight className="w-4 h-4" /></Button>
                ) : (
                  <Button variant="gold" size="lg" disabled={!canNext()} onClick={handleSubmit}>🗓️ {t.booking.confirm}</Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-dental">
                <h3 className="font-serif text-lg mb-4">{t.booking.summary}</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">{t.booking.service}:</span> {selectedService !== null ? services[selectedService].name : '—'}</p>
                  <p><span className="text-muted-foreground">{t.booking.doctor}:</span> {selectedDoctor !== null ? doctors[selectedDoctor].name : t.booking.noPreference}</p>
                  <p><span className="text-muted-foreground">{t.booking.dateTime}:</span> {selectedDate ? `${selectedDate.toLocaleDateString()} ${selectedTime || ''}` : '—'}</p>
                  <p><span className="text-muted-foreground">{t.booking.price}:</span> {selectedService !== null ? `${services[selectedService].price} RON` : '—'}</p>
                  <p><span className="text-muted-foreground">{t.booking.duration}:</span> {selectedService !== null ? services[selectedService].duration : '—'}</p>
                </div>
              </div>
              <div className="card-dental">
                <h3 className="font-serif text-lg mb-3">{t.booking.toKnow}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.booking.tips.map((tip, i) => <li key={i}>📋 {tip}</li>)}
                </ul>
              </div>
              <div className="card-dental">
                <h3 className="font-serif text-lg mb-2">{t.booking.callUs}</h3>
                <p className="text-sm text-muted-foreground mb-3">{t.booking.callLabel}</p>
                <a href="tel:+40720000000" className="flex items-center gap-2 text-primary font-semibold text-lg mb-2">
                  <Phone className="w-5 h-5" /> +40 720 XXX XXX
                </a>
                <a href="https://wa.me/40720000000" className="inline-flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-full text-sm font-medium">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
