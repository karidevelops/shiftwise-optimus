
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Asetukset</h1>
          <p className="text-muted-foreground">
            Hallitse sovelluksen asetuksia
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Yleiset</TabsTrigger>
            <TabsTrigger value="notifications">Ilmoitukset</TabsTrigger>
            <TabsTrigger value="scheduling">Työvuorosuunnittelu</TabsTrigger>
            <TabsTrigger value="integrations">Integraatiot</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Yleiset asetukset</CardTitle>
                <CardDescription>
                  Määritä sovelluksen asetukset
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Yrityksen nimi</Label>
                  <Input id="company_name" placeholder="Yrityksesi nimi" defaultValue="TerveysTeknologia Oy" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Aikavyöhyke</Label>
                  <Select defaultValue="europe-helsinki">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Valitse aikavyöhyke" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-helsinki">Eurooppa/Helsinki (GMT+3)</SelectItem>
                      <SelectItem value="europe-london">Eurooppa/Lontoo (GMT+1)</SelectItem>
                      <SelectItem value="america-new_york">Amerikka/New York (GMT-4)</SelectItem>
                      <SelectItem value="asia-tokyo">Aasia/Tokio (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Päivämäärä ja aika</Label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date_format">Päivämäärän muoto</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger id="date_format">
                          <SelectValue placeholder="Valitse päivämäärän muoto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">PP-KK-VVVV</SelectItem>
                          <SelectItem value="mm-dd-yyyy">KK-PP-VVVV</SelectItem>
                          <SelectItem value="yyyy-mm-dd">VVVV-KK-PP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time_format">Ajan muoto</Label>
                      <Select defaultValue="24h">
                        <SelectTrigger id="time_format">
                          <SelectValue placeholder="Valitse ajan muoto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24-tuntinen (14:30)</SelectItem>
                          <SelectItem value="12h">12-tuntinen (2:30 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="automatic_logout">Automaattinen uloskirjautuminen</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirjaudu automaattisesti ulos 30 minuutin käyttämättömyyden jälkeen
                    </p>
                  </div>
                  <Switch id="automatic_logout" defaultChecked />
                </div>
                
                <Button>Tallenna muutokset</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ilmoitusasetukset</CardTitle>
                <CardDescription>
                  Määritä miten vastaanotat ilmoituksia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_notifications">Sähköposti-ilmoitukset</Label>
                      <p className="text-sm text-muted-foreground">
                        Vastaanota ilmoituksia sähköpostitse
                      </p>
                    </div>
                    <Switch id="email_notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push_notifications">Push-ilmoitukset</Label>
                      <p className="text-sm text-muted-foreground">
                        Vastaanota push-ilmoituksia selaimessa
                      </p>
                    </div>
                    <Switch id="push_notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms_notifications">SMS-ilmoitukset</Label>
                      <p className="text-sm text-muted-foreground">
                        Vastaanota ilmoituksia tekstiviestitse
                      </p>
                    </div>
                    <Switch id="sms_notifications" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Ilmoitustapahtumat</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="shift_reminders">Vuoromuistutukset</Label>
                    <Switch id="shift_reminders" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="schedule_changes">Aikataulumuutokset</Label>
                    <Switch id="schedule_changes" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="shift_requests">Vuorotoiveet</Label>
                    <Switch id="shift_requests" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="time_off_requests">Vapaa-aikapyynnöt</Label>
                    <Switch id="time_off_requests" defaultChecked />
                  </div>
                </div>
                
                <Button>Tallenna muutokset</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduling" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Työvuorosuunnittelun asetukset</CardTitle>
                <CardDescription>
                  Määritä miten työvuorosuunnittelu toimii
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="schedule_view">Oletusnäkymä</Label>
                  <Select defaultValue="week">
                    <SelectTrigger id="schedule_view">
                      <SelectValue placeholder="Valitse oletusnäkymä" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Päivä</SelectItem>
                      <SelectItem value="week">Viikko</SelectItem>
                      <SelectItem value="month">Kuukausi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="first_day">Viikon ensimmäinen päivä</Label>
                  <Select defaultValue="monday">
                    <SelectTrigger id="first_day">
                      <SelectValue placeholder="Valitse ensimmäinen päivä" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monday">Maanantai</SelectItem>
                      <SelectItem value="sunday">Sunnuntai</SelectItem>
                      <SelectItem value="saturday">Lauantai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto_scheduling">Automaattinen työvuorosuunnittelu</Label>
                    <p className="text-sm text-muted-foreground">
                      Ota käyttöön tekoälyllä toimiva automaattinen vuorojako
                    </p>
                  </div>
                  <Switch id="auto_scheduling" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="conflict_detection">Konfliktien tunnistus</Label>
                    <p className="text-sm text-muted-foreground">
                      Tunnista automaattisesti työvuorojen päällekkäisyydet
                    </p>
                  </div>
                  <Switch id="conflict_detection" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="employee_requests">Salli työntekijöiden pyynnöt</Label>
                    <p className="text-sm text-muted-foreground">
                      Anna työntekijöiden pyytää vuoroja ja vapaita
                    </p>
                  </div>
                  <Switch id="employee_requests" defaultChecked />
                </div>
                
                <Button>Tallenna muutokset</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integraatiot</CardTitle>
                <CardDescription>
                  Yhdistä muihin järjestelmiin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Google Kalenteri</Label>
                      <p className="text-sm text-muted-foreground">
                        Synkronoi vuorot Google Kalenterin kanssa
                      </p>
                    </div>
                    <Button variant="outline">Yhdistä</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Microsoft 365</Label>
                      <p className="text-sm text-muted-foreground">
                        Synkronoi Outlook-kalenterin kanssa
                      </p>
                    </div>
                    <Button variant="outline">Yhdistä</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Palkkajärjestelmä</Label>
                      <p className="text-sm text-muted-foreground">
                        Vie työaikatiedot palkkahallintoon
                      </p>
                    </div>
                    <Button variant="outline">Yhdistä</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="api_key">API-avain</Label>
                  <div className="flex gap-2">
                    <Input id="api_key" type="password" value="••••••••••••••••••••••" readOnly />
                    <Button variant="outline">Kopioi</Button>
                    <Button variant="outline">Luo uusi</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Käytä tätä API-avainta käyttääksesi VuoroVelho-rajapintaa
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
