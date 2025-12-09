
export default function SocialProofSection() {
  return (
      <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">DON&apos;T JUST TAKE OUR WORD FOR IT.</h2>
                <div className="space-y-6">
                  <div className="brutal-card p-6 bg-accent/10 border-l-8 border-l-accent">
                    <p className="text-lg font-medium mb-4">&quot;Saved me $400 in the first month by catching a zombie subscription I forgot about years ago.&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-full"></div>
                      <div>
                        <p className="font-bold">Alex D.</p>
                        <p className="text-sm text-muted-foreground">Freelance Developer</p>
                      </div>
                    </div>
                  </div>
                  <div className="brutal-card p-6 bg-chart-1/10 border-l-8 border-l-chart-1">
                    <p className="text-lg font-medium mb-4">&quot;Finally, a tracker that doesn&apos;t look like a spreadsheet from 1999. It&apos;s actually fun to use.&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-full"></div>
                      <div>
                        <p className="font-bold">Sarah K.</p>
                        <p className="text-sm text-muted-foreground">Product Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-muted border-2 border-border brutal-shadow flex items-center justify-center">
                   <p className="font-heading text-2xl text-muted-foreground -rotate-12">App Screenshot Placeholder</p>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-chart-3 border-2 border-border rounded-full z-[-1]"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-chart-4 border-2 border-border z-[-1]"></div>
              </div>
            </div>
          </div>
        </section>
  )
}
