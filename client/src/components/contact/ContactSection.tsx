import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Instagram, Facebook, ExternalLink, Youtube } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, { message: "Il nome deve contenere almeno 2 caratteri" }),
  email: z.string().email({ message: "Inserisci un indirizzo email valido" }),
  subject: z.string().min(1, { message: "Seleziona un oggetto" }),
  message: z.string().min(10, { message: "Il messaggio deve contenere almeno 10 caratteri" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const isSubmitting = form.formState.isSubmitting;
  
  const onSubmit = async (data: ContactFormValues) => {
    // Simuliamo l'invio per la versione statica
    try {
      // Per GitHub Pages, useremo un servizio esterno come Formspree o mostreremo i dettagli per il contatto diretto
      const mailtoLink = `mailto:moondyviolin@example.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
        `Nome: ${data.name}\nEmail: ${data.email}\n\nMessaggio:\n${data.message}`
      )}`;
      
      window.open(mailtoLink, '_blank');
      
      toast({
        title: "Apertura client email",
        description: "Si sta aprendo il tuo client email con il messaggio precompilato. Completa l'invio da lì.",
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Prova a contattarmi direttamente via email.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8" ref={ref}>
        <div className="text-center mb-12">
          <motion.h2 
            className="font-playfair italic text-3xl md:text-4xl font-bold text-purple-dark mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Contattami
          </motion.h2>
          <motion.p 
            className="text-purple-darker max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Sei interessato a commissionare un'opera, collaborare su un progetto o semplicemente conoscere meglio il mio lavoro? Scrivimi!
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10">
          <motion.div 
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="bg-neutral-light p-8 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-dark font-medium">Nome</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Il tuo nome" 
                            {...field} 
                            className="border-purple-light/50 focus:ring-primary focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-dark font-medium">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="La tua email" 
                            type="email" 
                            {...field} 
                            className="border-purple-light/50 focus:ring-primary focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-dark font-medium">Oggetto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-purple-light/50 focus:ring-primary focus:border-transparent">
                              <SelectValue placeholder="Seleziona un'opzione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="commission">Commissione artistica</SelectItem>
                            <SelectItem value="collaboration">Proposta di collaborazione</SelectItem>
                            <SelectItem value="exhibition">Opportunità di esposizione</SelectItem>
                            <SelectItem value="inquiry">Richiesta informazioni</SelectItem>
                            <SelectItem value="other">Altro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-dark font-medium">Messaggio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Il tuo messaggio" 
                            rows={5} 
                            {...field} 
                            className="border-purple-light/50 focus:ring-primary focus:border-transparent resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-primary text-white hover:bg-purple-dark shadow-lg shadow-primary/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="bg-neutral-light p-8 rounded-lg shadow-lg h-full"
              variants={itemVariants}
            >
              <div className="mb-10">
                <h3 className="font-playfair italic text-2xl text-purple-dark mb-4">Informazioni di Contatto</h3>
                <div className="flex items-start mb-4">
                  <MapPin className="text-primary mt-1 mr-4 w-5" />
                  <p className="text-purple-darker">
                    La Bottega di Moondy<br />
                    Studio Creativo<br />
                    Italia
                  </p>
                </div>
                <div className="flex items-center mb-4">
                  <Mail className="text-primary mr-4 w-5" />
                  <p className="text-purple-darker">info@labottegadimoondy.it</p>
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="font-playfair italic text-2xl text-purple-dark mb-4">Disponibilità</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-purple-darker">Risposta email:</div>
                  <div className="text-purple-darker">Entro 48 ore</div>
                  <div className="text-purple-darker">Commissioni:</div>
                  <div className="text-purple-darker">Da concordare</div>
                  <div className="text-purple-darker">Collaborazioni:</div>
                  <div className="text-purple-darker">Aperte</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-playfair italic text-2xl text-purple-dark mb-4">Seguimi sui Social</h3>
                <div className="flex flex-wrap gap-4">
                  <a href="https://www.instagram.com/moondyviolin/?igshid=MzRlODBiNWFlZA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-purple-dark social-icon flex items-center gap-2">
                    <Instagram className="h-5 w-5" />
                    <span className="text-sm">Instagram</span>
                  </a>
                  <a href="https://www.facebook.com/people/Moondy/61558375220396/?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-purple-dark social-icon flex items-center gap-2">
                    <Facebook className="h-5 w-5" />
                    <span className="text-sm">Facebook</span>
                  </a>
                  <a href="https://www.deviantart.com/moondyviolin" target="_blank" rel="noopener noreferrer" className="text-purple-dark social-icon flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    <span className="text-sm">DeviantArt</span>
                  </a>
                  <a href="https://www.youtube.com/@moondyviolin" target="_blank" rel="noopener noreferrer" className="text-purple-dark social-icon flex items-center gap-2">
                    <Youtube className="h-5 w-5" />
                    <span className="text-sm">YouTube</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
