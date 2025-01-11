import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TYPE } from "@/constants/const";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchApi } from "@/config/api";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import Loader from "@/components/Loader";
import DebounceSearch from "@/components/DebounceSearch";
import useQueryParams from "@/hooks/useQueryParams";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Character } from "@/types/Character";

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const Home: React.FC = () => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const [search, setSearch] = useState<string>(getQueryParam("search") || "");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(
    getQueryParam("tab") || TYPE.NORSEMEN.type
  );

  useEffect(() => {
    setQueryParam("search", search || null);
  }, [search]);

  useEffect(() => {
    setQueryParam("tab", activeTab);
  }, [activeTab]);

  const headers = [
    "Character",
    "Actor Name",
    "Description",
    "Image",
    "Actions",
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchApi<{ results: Character[] }>(
          `/${activeTab}`,
          { search: search }
        );

        if (response.error) {
          console.error("Failed to fetch characters:", response.error);
          setCharacters([]);
        } else {
          setCharacters(response.data.results || []);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setCharacters([]);
      }
      setLoading(false);
    };
    loadData();
  }, [activeTab, search]);

  const rows = characters.map((character) => ({
    Name: character.character_name ?? "Not specified.",
    Actor: character.name ?? "Not specified.",
    Description: truncateText(
      character.description || character.character_description || "Not specified.",
      100
    ),
    Image: (
      <div className="flex items-center justify-start gap-2">
        {character.img_src || character.image_src ? (
          <img
            src={character.img_src || character.image_src}
            alt={character.name}
            height={150}
            width={150}
          />
        ) : (
          <p>No image found.</p>
        )}
      </div>
    ),
    Actions: (
      <div className="flex items-center justify-start gap-2 w-full">
        <Button asChild className="bg-blue-400 p-2 text-xs">
          <Link to={`/character/${character.id}/?tab=${activeTab}`}>View Details</Link>
        </Button>
      </div>
    ),
  }));

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Character Explorer</CardTitle>
          <CardDescription>
            Dive into the world of characters and explore their stories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <div className="flex justify-between">
              <TabsList>
                {Object.values(TYPE).map((value, index) => (
                  <TabsTrigger key={index} value={value.type}>
                    {value.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="flex justify-between w-[300px]">
                <DebounceSearch
                  placeholder="Search characters..."
                  onChange={(value) => setSearch(value)}
                />
              </div>
            </div>
            <TabsContent value={activeTab}>
              {loading ? <Loader /> : <Table headers={headers} rows={rows} />}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
