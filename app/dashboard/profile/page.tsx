'use client'

import { useSession } from 'next-auth/react'
import { PageTransition } from '@/components/ui/page-transition'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Calendar, Mail, Shield } from 'lucide-react'

export default function ProfilePage() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const { user } = session

  return (
    <PageTransition className="container max-w-4xl py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Profile</h1>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || '/userProfile.png'} />
              <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name || 'Anonymous User'}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={user.role === 'ADMIN' ? 'destructive' : 'default'}>
                  {user.role}
                </Badge>
                {user.isPro && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    PRO
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Two-factor authentication: {user.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  )
} 