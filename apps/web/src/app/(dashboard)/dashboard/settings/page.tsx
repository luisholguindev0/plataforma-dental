import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Bell, Building2, Shield, Save } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">
          Configuración
        </h1>
        <p className="text-gray-600 mt-1">
          Administra tu perfil, preferencias y configuración del sistema.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          <TabsTrigger value="business">Negocio</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>
                    Actualiza tu información personal y foto de perfil.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user.email || ""}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">
                    El correo electrónico no puede ser modificado.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <Input
                      id="firstName"
                      defaultValue={profile?.first_name || ""}
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Apellido
                    </label>
                    <Input
                      id="lastName"
                      defaultValue={profile?.last_name || ""}
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue={profile?.phone || ""}
                    placeholder="+57 300 000 0000"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Bell className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <CardTitle>Preferencias</CardTitle>
                  <CardDescription>
                    Configura tus preferencias de visualización y notificaciones.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Tema
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          defaultChecked
                          className="w-4 h-4 text-primary-600"
                        />
                        <span className="text-sm">Claro</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          className="w-4 h-4 text-primary-600"
                        />
                        <span className="text-sm">Oscuro</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="theme"
                          value="system"
                          className="w-4 h-4 text-primary-600"
                        />
                        <span className="text-sm">Sistema</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="language" className="text-sm font-medium text-gray-700">
                      Idioma
                    </label>
                    <select
                      id="language"
                      className="flex h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      defaultValue="es"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="timezone" className="text-sm font-medium text-gray-700">
                      Zona Horaria
                    </label>
                    <select
                      id="timezone"
                      className="flex h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      defaultValue="America/Bogota"
                    >
                      <option value="America/Bogota">Bogotá (GMT-5)</option>
                      <option value="America/New_York">New York (GMT-5)</option>
                      <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Notificaciones</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Notificaciones por email</span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Recordatorios de citas</span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Nuevos pacientes</span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Save className="w-4 h-4" />
                    Guardar Preferencias
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <CardTitle>Información del Negocio</CardTitle>
                  <CardDescription>
                    Configura la información de tu consultorio dental.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                    Nombre del Consultorio
                  </label>
                  <Input
                    id="businessName"
                    defaultValue="Dr. Jhoiner Marquez - Odontología Estética"
                    placeholder="Nombre del consultorio"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <Input
                    id="address"
                    defaultValue="Calle 58 #62-61, Barranquilla"
                    placeholder="Dirección completa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+57 301 499 0844"
                      placeholder="+57 300 000 0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                      WhatsApp
                    </label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      defaultValue="+57 301 499 0844"
                      placeholder="+57 300 000 0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="hours" className="text-sm font-medium text-gray-700">
                    Horarios de Atención
                  </label>
                  <textarea
                    id="hours"
                    rows={4}
                    className="flex w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    defaultValue="Lunes a Viernes: 8:00 AM - 6:00 PM&#10;Sábados: 8:00 AM - 12:00 PM"
                    placeholder="Horarios de atención"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Save className="w-4 h-4" />
                    Guardar Información
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Shield className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <CardTitle>Seguridad</CardTitle>
                  <CardDescription>
                    Administra la seguridad de tu cuenta y sesiones activas.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Cambiar Contraseña</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                        Contraseña Actual
                      </label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="Ingresa tu contraseña actual"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                        Nueva Contraseña
                      </label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Ingresa tu nueva contraseña"
                      />
                      <p className="text-xs text-gray-500">
                        La contraseña debe tener al menos 8 caracteres.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                        Confirmar Nueva Contraseña
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirma tu nueva contraseña"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <Button type="submit" className="gap-2">
                        <Save className="w-4 h-4" />
                        Actualizar Contraseña
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Two Factor Authentication */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Autenticación de Dos Factores
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Agrega una capa adicional de seguridad a tu cuenta.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activar
                    </Button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Sesiones Activas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Sesión Actual</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date().toLocaleString("es-CO")}
                        </p>
                      </div>
                      <SessionBadge>Activa</SessionBadge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Badge component for active session
function SessionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-500 text-white">
      {children}
    </span>
  );
}
