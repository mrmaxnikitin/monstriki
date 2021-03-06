ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Статистика" do
          yandex_link = <<-LINK
            <!-- Yandex.Metrika informer -->
<a href="https://metrika.yandex.ru/stat/?id=39725760&amp;from=informer"
target="_blank" rel="nofollow"><img src="https://informer.yandex.ru/informer/39725760/3_1_FFFFFFFF_EFEFEFFF_0_uniques"
style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" class="ym-advanced-informer" data-cid="39725760" data-lang="ru" /></a>
<!-- /Yandex.Metrika informer -->
          LINK
          yandex_link.html_safe
        end
      end

      column do
        panel "Пользователи" do
          h4 "Активные #{User.count}"
        end
      end

    end

  end # content

end
