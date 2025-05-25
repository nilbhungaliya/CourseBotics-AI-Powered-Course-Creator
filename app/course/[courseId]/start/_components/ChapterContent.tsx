import { ChapterContentType, ChapterType } from "@/types/types";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { BookOpen, Code, FileText, Lightbulb, Video } from "lucide-react";
import { cn } from "@/lib/utils";

type ChapterContentProps = {
  chapter: ChapterType | null;
  content: ChapterContentType | null;
};

const videoOpts = {
  height: "390",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    modestbranding: 1,
    rel: 0,
  },
};

const ChapterContent = ({ chapter, content }: ChapterContentProps) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {chapter?.chapterName}
        </h1>
        <p className="text-muted-foreground text-lg">
          {chapter?.about}
        </p>
      </div>

      {/* Video section */}
      <Card className="mb-8 overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-1">
          <div className="bg-card rounded-t-sm p-4 flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            <h2 className="font-medium">Video Lesson</h2>
          </div>
        </div>
        <div className="aspect-video bg-black flex items-center justify-center overflow-hidden">
          {content?.videoId ? (
            <YouTube
              key={content.videoId}
              videoId={content.videoId}
              opts={videoOpts}
              onReady={onPlayerReady}
              className="w-full"
            />
          ) : (
            <div className="text-muted-foreground flex flex-col items-center justify-center">
              <Video className="h-12 w-12 mb-2 opacity-20" />
              <p>Video is loading or unavailable</p>
            </div>
          )}
        </div>
      </Card>

      {/* Content sections */}
      {content?.content.concepts && content.content.concepts.length > 0 && (
        <div className="space-y-6">
          {content.content.concepts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className={cn(
                  "bg-gradient-to-r py-4",
                  index % 3 === 0 ? "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20" :
                  index % 3 === 1 ? "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20" :
                  "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20"
                )}>
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      index % 3 === 0 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                      index % 3 === 1 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                    )}>
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        Key concept {index + 1} of {content.content.concepts.length}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="content" className="gap-1.5">
                        <FileText className="h-4 w-4" />
                        <span>Content</span>
                      </TabsTrigger>
                      {item.code_examples && item.code_examples.length > 0 && (
                        <TabsTrigger value="code" className="gap-1.5">
                          <Code className="h-4 w-4" />
                          <span>Code Examples</span>
                        </TabsTrigger>
                      )}
                    </TabsList>
                    
                    <TabsContent value="content" className="mt-0">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <ReactMarkdown>
                          {item.explanation}
                        </ReactMarkdown>
                      </div>
                    </TabsContent>
                    
                    {item.code_examples && item.code_examples.length > 0 && (
                      <TabsContent value="code" className="mt-0">
                        <div className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
                          {item.code_examples.map((example, idx) => (
                            <pre key={idx} className="text-sm font-mono">
                              <code>
                                {Array.isArray(example.code)
                                  ? example.code
                                      .join("")
                                      .replace("<precode>", "")
                                      .replace("</precode>", "")
                                  : (example.code as string)
                                      .replace("<precode>", "")
                                      .replace("</precode>", "")}
                              </code>
                            </pre>
                          ))}
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Empty state */}
      {(!content?.content.concepts || content.content.concepts.length === 0) && (
        <Card className="p-12 flex flex-col items-center justify-center text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-medium mb-2">Content is loading</h3>
          <p className="text-muted-foreground max-w-md">
            The chapter content is being prepared. Please wait a moment or try refreshing the page.
          </p>
        </Card>
      )}
    </div>
  );
};

export default ChapterContent;
