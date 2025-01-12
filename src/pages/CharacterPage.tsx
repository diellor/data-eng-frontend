import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchApi } from "@/config/api";
import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@radix-ui/react-label";
import Table from "@/components/Table";
import { Character } from "@/types/Character";

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab") || "vikings_nfl";

  useEffect(() => {
    const loadCharacter = async () => {
      setLoading(true);
      try {
        const response = await fetchApi<Character>(`/${currentTab}/${id}`);
        if (response.error) {
          console.error("Error fetching character:", response.error);
          setCharacter(null);
        } else {
          setCharacter(response.data); // response.data is a single Character
        }
      } catch (error) {
        console.error("Error:", error);
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCharacter();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!character) {
    return <div className="p-4">Character not found.</div>;
  }

  const statsHeaders = [
    "Season",
    "Team",
    "Games Played",
    "Touchdowns",
    "Yards",
  ];
  const statsRows: Record<any, any>[] = character.career_stats
      ? character.career_stats.map((stat: any) => ({
        Season: stat.season || "N/A",
        Team: stat.team || "N/A",
        "Games Played": stat.games_played ?? "N/A",
        Touchdowns: stat.touchdowns ?? "N/A",
        Yards: stat.yards ?? "N/A",
      }))
      : [];

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {character.name || character.character_name || "Character Details"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-10 items-center">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src={
                  character.image_src ||
                  character.img_src ||
                  "https://via.placeholder.com/150"
                }
                alt={character.name || character.character_name || "Character"}
              />
              <AvatarFallback>
                {character.name?.[0] || character.character_name?.[0] || "C"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex gap-1 items-center">
                <Label>Name:</Label>
                {character.profile_link || character.actor_url ? (
                  <a
                    href={character.profile_link || character.actor_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {character.name}
                  </a>
                ) : (
                  <span>{character.name}</span>
                )}
              </div>
              <div className="flex gap-1 items-center">
                <Label>Age:</Label>
                <p>{character.age || "N/A"}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Label>Height:</Label>
                <p>{character.height || "N/A"}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Label>Weight:</Label>
                <p>{character.weight || "N/A"}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Label>College:</Label>
                <p>{character.college || "N/A"}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Label>Experience:</Label>
                <p>{character.experience || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold">Biography</h2>
            {character.biography_html ? (
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: character.biography_html }}
              />
            ) : (
              <p>No biography available.</p>
            )}
          </div>

          {character.character_description && (
            <div className="mt-4">
              <h2 className="text-lg font-bold">Character Description</h2>
              <p>{character.character_description}</p>
            </div>
          )}

          {character.career_stats && character.career_stats.length > 0 && (
            <>
              <h2 className="text-lg font-bold mt-6">Career Stats</h2>
              <Table headers={statsHeaders} rows={statsRows} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterPage;
