import Tab from "@/classes/TabContainer/Tab";
import TabPage from "@/component/container/TabContainer/TabPage";
import Link from "next/link";
import { usePageContext } from "../page.context";
import { EntityCard } from "@/component/container/EntityContainer/EntityCard";

const Page = () => {
  const { properties } = usePageContext();

  console.log("properties");
  console.log(properties);

  return (
    <TabPage label="Propriedades">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Minhas Propriedades</h2>

        <Link
          href="property/register"
          className="
            px-4 py-2
            rounded-xl
            text-sm
            font-medium
            btn-primary
            btn-hover
            text-white
            transition
            shrink-0
          "
        >
          + Nova propriedade
        </Link>
      </div>

      <div className="space-y-4 flex flex-row">
        {(properties &&
          properties.map((property) => {
            return (
              <div key={property.id} className="mr-3">
                <EntityCard
                  title={property.name}
                  description={property.description}
                  image={property.images[0]}
                  redirectTo={`/user/property/${property.id}`}
                />
              </div>
            );
          })) ||
          null}
      </div>
    </TabPage>
  );
};

const PropertiesTab = new Tab(
  { default: "Propriedades", page: "Minhas Propriedades" },
  Page,
);

export default PropertiesTab;
